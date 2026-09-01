-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('MILD', 'SPICY', 'SAVAGE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('GENERAL', 'WORK', 'DATING', 'EXISTENTIAL', 'TECH');

-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL', 'ROAST');

-- CreateTable
CREATE TABLE "Fortune" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "intensity" "Intensity" NOT NULL DEFAULT 'SPICY',
    "category" "Category" NOT NULL DEFAULT 'GENERAL',
    "sentiment" "Sentiment" NOT NULL DEFAULT 'ROAST',
    "isApproved" BOOLEAN NOT NULL DEFAULT true,
    "timesDrawn" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fortune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSeed" (
    "id" TEXT NOT NULL,
    "seedKey" TEXT NOT NULL,
    "devicePlatform" TEXT,
    "queryCount" INTEGER NOT NULL DEFAULT 0,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FortuneLog" (
    "id" TEXT NOT NULL,
    "userSeedId" TEXT,
    "fortuneId" TEXT NOT NULL,
    "intensityRequested" "Intensity" NOT NULL DEFAULT 'SPICY',
    "drawnAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FortuneLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fortune_text_key" ON "Fortune"("text");

-- CreateIndex
CREATE INDEX "Fortune_intensity_idx" ON "Fortune"("intensity");

-- CreateIndex
CREATE INDEX "Fortune_category_idx" ON "Fortune"("category");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeed_seedKey_key" ON "UserSeed"("seedKey");

-- CreateIndex
CREATE INDEX "UserSeed_seedKey_idx" ON "UserSeed"("seedKey");

-- CreateIndex
CREATE INDEX "FortuneLog_userSeedId_idx" ON "FortuneLog"("userSeedId");

-- CreateIndex
CREATE INDEX "FortuneLog_drawnAt_idx" ON "FortuneLog"("drawnAt");

-- AddForeignKey
ALTER TABLE "FortuneLog" ADD CONSTRAINT "FortuneLog_userSeedId_fkey" FOREIGN KEY ("userSeedId") REFERENCES "UserSeed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FortuneLog" ADD CONSTRAINT "FortuneLog_fortuneId_fkey" FOREIGN KEY ("fortuneId") REFERENCES "Fortune"("id") ON DELETE CASCADE ON UPDATE CASCADE;
