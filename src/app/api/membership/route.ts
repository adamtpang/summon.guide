import { auth } from "@/auth";
import {
  getMembership,
  SUMMON_ACCESS_MODE,
  SUMMON_MEMBERSHIP_PRICE,
  SUMMON_MONTHLY_SESSION_LIMIT,
} from "@/lib/membership";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ signedIn: false, accessMode: SUMMON_ACCESS_MODE, price: SUMMON_MEMBERSHIP_PRICE, monthlySessions: SUMMON_MONTHLY_SESSION_LIMIT });
  const membership = await getMembership(session.user.id);
  return Response.json({ signedIn: true, accessMode: SUMMON_ACCESS_MODE, membership, price: SUMMON_MEMBERSHIP_PRICE, monthlySessions: SUMMON_MONTHLY_SESSION_LIMIT });
}
