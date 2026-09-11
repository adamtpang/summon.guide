import { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

function verifiedStripeEvent(body: string, signature: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return process.env.NODE_ENV === "production" ? null : JSON.parse(body);
  const timestamp = signature?.match(/(?:^|,)t=(\d+)/)?.[1];
  if (!timestamp || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return null;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  const supplied = signature?.match(/(?:^|,)v1=([a-f0-9]+)/i)?.[1];
  if (!supplied || supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return null;
  return JSON.parse(body);
}

// Stripe sends checkout.session.completed webhook here
// For payment links, the customer_email is included
export async function POST(req: NextRequest) {
  const body = await req.text();

  try {
    const event = verifiedStripeEvent(body, req.headers.get("stripe-signature"));
    if (!event) return Response.json({ error: "Invalid Stripe signature" }, { status: 400 });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email || session.customer_details?.email;

      if (!email) {
        console.error("Webhook: No email in checkout session");
        return Response.json({ error: "No email" }, { status: 400 });
      }

      const customerId = typeof session.customer === "string" ? session.customer : null;
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        await prisma.user.update({
          where: { email },
          data: session.mode === "subscription" ? {
            membershipStatus: "ACTIVE",
            membershipSessionsUsed: 0,
            membershipSessionLimit: 5,
            membershipRenewsAt: null,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
          } : { credits: { increment: 100 } },
        });
        console.log(session.mode === "subscription" ? `Activated Summon membership for ${email}` : `Added 100 credits to ${email}, new total: ${user.credits + 100}`);
      } else {
        console.error(`Webhook: User not found for email ${email}`);
      }
    }

    if (["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted"].includes(event.type)) {
      const subscription = event.data.object;
      const subscriptionId = typeof subscription.id === "string" ? subscription.id : null;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
      const isActive = ["active", "trialing"].includes(subscription.status);
      const renewsAt = typeof subscription.current_period_end === "number" ? new Date(subscription.current_period_end * 1000) : null;
      const user = subscriptionId ? await prisma.user.findFirst({ where: { OR: [{ stripeSubscriptionId: subscriptionId }, ...(customerId ? [{ stripeCustomerId: customerId }] : [])] } }) : null;
      if (user) await prisma.user.update({ where: { id: user.id }, data: { membershipStatus: isActive ? "ACTIVE" : subscription.status === "past_due" ? "PAST_DUE" : "CANCELED", membershipSessionsUsed: isActive ? 0 : user.membershipSessionsUsed, membershipSessionLimit: 5, membershipRenewsAt: renewsAt, stripeCustomerId: customerId ?? user.stripeCustomerId, stripeSubscriptionId: subscriptionId ?? user.stripeSubscriptionId } });
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ error: "Webhook failed" }, { status: 500 });
  }
}
