import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const SUMMON_MEMBERSHIP_PRICE = "$5/month";
export const SUMMON_MONTHLY_SESSION_LIMIT = 5;
export const SUMMON_ACCESS_MODE = process.env.SUMMON_ACCESS_MODE === "paid"
  ? "paid"
  : "testing";

export function isTestingAccess() {
  return SUMMON_ACCESS_MODE === "testing";
}

// The owner records daily PangPod episodes with the guides, so their account is never metered.
const OWNER_EMAILS = (process.env.SUMMON_OWNER_EMAILS ?? "adamtpang@gmail.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isOwnerEmail(email?: string | null) {
  return Boolean(email && OWNER_EMAILS.includes(email.toLowerCase()));
}

export type LicenseResult =
  | { ok: true; remaining: number; renewsAt: Date | null }
  | { ok: false; code: "sign_in_required" | "membership_required" | "session_limit_reached" };

export function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function makeSecret(prefix: string) {
  return `${prefix}${randomBytes(32).toString("base64url")}`;
}

export async function getMembership(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, membershipStatus: true, membershipSessionsUsed: true, membershipSessionLimit: true, membershipRenewsAt: true },
  });
}

export async function consumeGuideSession(userId?: string): Promise<LicenseResult> {
  if (!userId) return { ok: false, code: "sign_in_required" };
  if (isTestingAccess()) {
    return {
      ok: true,
      remaining: SUMMON_MONTHLY_SESSION_LIMIT,
      renewsAt: null,
    };
  }
  const membership = await getMembership(userId);
  if (membership && isOwnerEmail(membership.email)) {
    return { ok: true, remaining: SUMMON_MONTHLY_SESSION_LIMIT, renewsAt: null };
  }
  if (!membership || membership.membershipStatus !== "ACTIVE") {
    return { ok: false, code: "membership_required" };
  }
  if (membership.membershipRenewsAt && membership.membershipRenewsAt <= new Date()) {
    return { ok: false, code: "membership_required" };
  }
  const used = await prisma.user.updateMany({
    where: { id: userId, membershipSessionsUsed: { lt: membership.membershipSessionLimit } },
    data: { membershipSessionsUsed: { increment: 1 } },
  });
  if (used.count === 0) return { ok: false, code: "session_limit_reached" };
  return { ok: true, remaining: membership.membershipSessionLimit - membership.membershipSessionsUsed - 1, renewsAt: membership.membershipRenewsAt };
}

export async function authenticateMcpToken(authorization: string | null) {
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  const record = await prisma.mcpAccessToken.findFirst({
    where: { tokenHash: hashSecret(token), revokedAt: null, expiresAt: { gt: new Date() } },
    select: { id: true, userId: true },
  });
  if (record) await prisma.mcpAccessToken.update({ where: { id: record.id }, data: { lastUsedAt: new Date() } });
  return record?.userId ?? null;
}

export function licenseError(result: Exclude<LicenseResult, { ok: true }>) {
  const status = result.code === "sign_in_required" ? 401 : result.code === "session_limit_reached" ? 429 : 402;
  const message = result.code === "sign_in_required"
    ? "Sign in to Summon first."
    : result.code === "session_limit_reached"
      ? "Your five monthly guide sessions are used. Your allowance renews next billing cycle."
      : "This guide requires a Summon Member license.";
  return Response.json({ error: message, code: result.code, upgradeUrl: "/connect" }, { status });
}
