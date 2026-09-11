import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { hashSecret, isTestingAccess, makeSecret } from "@/lib/membership";

function s256(value: string) {
  return createHash("sha256").update(value).digest("base64url");
}

function tokenResponse(accessToken: string, refreshToken: string) {
  return Response.json({ access_token: accessToken, token_type: "Bearer", expires_in: 60 * 60 * 24 * 30, refresh_token: refreshToken, scope: "summon:consult" });
}

export async function POST(req: Request) {
  const form = await req.formData();
  const grantType = String(form.get("grant_type") ?? "");
  const clientId = String(form.get("client_id") ?? "");
  if (!clientId) return Response.json({ error: "invalid_request", error_description: "client_id is required" }, { status: 400 });

  if (grantType === "authorization_code") {
    const code = String(form.get("code") ?? "");
    const redirectUri = String(form.get("redirect_uri") ?? "");
    const verifier = String(form.get("code_verifier") ?? "");
    const record = await prisma.mcpAuthorizationCode.findFirst({ where: { codeHash: hashSecret(code), clientId, redirectUri, usedAt: null, expiresAt: { gt: new Date() } } });
    if (!record || !verifier || s256(verifier) !== record.codeChallenge) return Response.json({ error: "invalid_grant" }, { status: 400 });
    await prisma.mcpAuthorizationCode.update({ where: { id: record.id }, data: { usedAt: new Date() } });
    const accessToken = makeSecret("sm_at_");
    const refreshToken = makeSecret("sm_rt_");
    await prisma.mcpAccessToken.create({ data: { tokenHash: hashSecret(accessToken), refreshTokenHash: hashSecret(refreshToken), clientId, userId: record.userId, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60_000) } });
    return tokenResponse(accessToken, refreshToken);
  }

  if (grantType === "refresh_token") {
    const refreshToken = String(form.get("refresh_token") ?? "");
    const record = await prisma.mcpAccessToken.findFirst({ where: { refreshTokenHash: hashSecret(refreshToken), clientId, revokedAt: null } });
    if (!record) return Response.json({ error: "invalid_grant" }, { status: 400 });
    if (!isTestingAccess()) {
      const user = await prisma.user.findUnique({ where: { id: record.userId }, select: { membershipStatus: true, membershipRenewsAt: true } });
      if (!user || user.membershipStatus !== "ACTIVE" || (user.membershipRenewsAt && user.membershipRenewsAt <= new Date())) return Response.json({ error: "access_denied", error_description: "Membership is not active." }, { status: 403 });
    }
    const accessToken = makeSecret("sm_at_");
    const nextRefreshToken = makeSecret("sm_rt_");
    await prisma.mcpAccessToken.update({ where: { id: record.id }, data: { tokenHash: hashSecret(accessToken), refreshTokenHash: hashSecret(nextRefreshToken), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60_000), revokedAt: null } });
    return tokenResponse(accessToken, nextRefreshToken);
  }
  return Response.json({ error: "unsupported_grant_type" }, { status: 400 });
}
