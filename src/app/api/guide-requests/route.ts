import { auth } from "@/auth";
import { guideAgents } from "@/lib/guideAgents";
import {
  GUIDE_REQUEST_KINDS,
  normalizeGuideRequestName,
} from "@/lib/guideOnboarding";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  kind: z.enum(GUIDE_REQUEST_KINDS),
  problem: z.string().trim().max(600).optional().default(""),
  sourceUrl: z
    .union([z.url().max(500), z.literal("")])
    .optional()
    .default(""),
});

const kindToDatabase = {
  person: "PERSON",
  channel: "CHANNEL",
  book: "BOOK",
} as const;

function serializeRequest(request: {
  id: string;
  requestedName: string;
  kind: "PERSON" | "CHANNEL" | "BOOK";
  status:
    | "REQUESTED"
    | "TRIAGED"
    | "SOURCING"
    | "CORPUS_BUILDING"
    | "DISTILLING"
    | "VERIFYING"
    | "READY"
    | "DECLINED";
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: request.id,
    name: request.requestedName,
    kind: request.kind.toLowerCase(),
    status: request.status,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ signedIn: false, requests: [] }, { status: 401 });
  }

  const requests = await prisma.guideRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: 12,
    select: {
      id: true,
      requestedName: true,
      kind: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return Response.json({
    signedIn: true,
    requests: requests.map(serializeRequest),
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Sign in to request a guide." }, { status: 401 });
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json(
      { error: "Add a guide name and check the optional source URL." },
      { status: 400 },
    );
  }

  const normalizedName = normalizeGuideRequestName(parsed.data.name);
  const existingAgent = guideAgents.find(
    (agent) => normalizeGuideRequestName(agent.name) === normalizedName,
  );

  if (existingAgent) {
    return Response.json(
      {
        error: `${existingAgent.name} is already in the roster.`,
        href: existingAgent.chatHref || existingAgent.profileHref || "/summon",
      },
      { status: 409 },
    );
  }

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentRequests = await prisma.guideRequest.count({
    where: { userId: session.user.id, createdAt: { gte: oneDayAgo } },
  });
  if (recentRequests >= 10) {
    return Response.json(
      { error: "You have reached today's request limit. Try again tomorrow." },
      { status: 429 },
    );
  }

  const saved = await prisma.guideRequest.upsert({
    where: {
      userId_normalizedName: {
        userId: session.user.id,
        normalizedName,
      },
    },
    create: {
      userId: session.user.id,
      requestedName: parsed.data.name,
      normalizedName,
      kind: kindToDatabase[parsed.data.kind],
      problem: parsed.data.problem || null,
      sourceUrl: parsed.data.sourceUrl || null,
    },
    update: {
      requestedName: parsed.data.name,
      kind: kindToDatabase[parsed.data.kind],
      problem: parsed.data.problem || null,
      sourceUrl: parsed.data.sourceUrl || null,
    },
    select: {
      id: true,
      requestedName: true,
      kind: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return Response.json({ success: true, request: serializeRequest(saved) });
}
