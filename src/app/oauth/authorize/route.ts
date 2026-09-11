import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hashSecret, isTestingAccess, makeSecret } from "@/lib/membership";

function oauthError(request: NextRequest, error: string, description: string) {
  const redirectUri = request.nextUrl.searchParams.get("redirect_uri");
  const state = request.nextUrl.searchParams.get("state");
  if (redirectUri && /^https?:\/\//.test(redirectUri)) {
    const url = new URL(redirectUri);
    url.searchParams.set("error", error);
    url.searchParams.set("error_description", description);
    if (state) url.searchParams.set("state", state);
    return NextResponse.redirect(url);
  }
  return Response.json({ error, error_description: description }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    const signIn = new URL("/api/auth/signin", request.url);
    signIn.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signIn);
  }
  const params = request.nextUrl.searchParams;
  const clientId = params.get("client_id");
  const redirectUri = params.get("redirect_uri");
  const challenge = params.get("code_challenge");
  if (params.get("response_type") !== "code" || !clientId || !redirectUri || !challenge || params.get("code_challenge_method") !== "S256") return oauthError(request, "invalid_request", "Authorization code flow with S256 PKCE is required.");
  const client = await prisma.mcpOAuthClient.findUnique({ where: { clientId } });
  if (!client || !JSON.parse(client.redirectUris).includes(redirectUri)) return oauthError(request, "invalid_client", "The redirect URI is not registered.");
  if (!isTestingAccess()) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { membershipStatus: true, membershipRenewsAt: true } });
    if (!user || user.membershipStatus !== "ACTIVE" || (user.membershipRenewsAt && user.membershipRenewsAt <= new Date())) return oauthError(request, "access_denied", "A current Summon Member subscription is required.");
  }
  const code = makeSecret("sm_code_");
  await prisma.mcpAuthorizationCode.create({ data: { codeHash: hashSecret(code), clientId, userId: session.user.id, redirectUri, codeChallenge: challenge, expiresAt: new Date(Date.now() + 5 * 60_000) } });
  const destination = new URL(redirectUri);
  destination.searchParams.set("code", code);
  const state = params.get("state");
  if (state) destination.searchParams.set("state", state);
  return NextResponse.redirect(destination);
}
