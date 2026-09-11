CREATE TYPE "GuideRequestKind" AS ENUM ('PERSON', 'CHANNEL', 'BOOK');

CREATE TYPE "GuideRequestStatus" AS ENUM (
  'REQUESTED',
  'TRIAGED',
  'SOURCING',
  'CORPUS_BUILDING',
  'DISTILLING',
  'VERIFYING',
  'READY',
  'DECLINED'
);

CREATE TABLE "GuideRequest" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "requestedName" TEXT NOT NULL,
  "normalizedName" TEXT NOT NULL,
  "kind" "GuideRequestKind" NOT NULL,
  "problem" TEXT,
  "sourceUrl" TEXT,
  "status" "GuideRequestStatus" NOT NULL DEFAULT 'REQUESTED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "GuideRequest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GuideRequest_userId_normalizedName_key"
  ON "GuideRequest"("userId", "normalizedName");
CREATE INDEX "GuideRequest_normalizedName_idx"
  ON "GuideRequest"("normalizedName");
CREATE INDEX "GuideRequest_status_createdAt_idx"
  ON "GuideRequest"("status", "createdAt");

ALTER TABLE "GuideRequest"
  ADD CONSTRAINT "GuideRequest_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
