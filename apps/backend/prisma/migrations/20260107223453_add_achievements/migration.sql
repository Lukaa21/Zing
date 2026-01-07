-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('GAMES_PLAYED', 'SOLO_WINS', 'DUO_WINS', 'POINTS_TAKEN', 'ZINGS_MADE', 'GAMES_HOSTED', 'FRIENDS_ADDED');

-- AlterTable
ALTER TABLE "MatchHistory" ADD COLUMN     "hostUserId" TEXT,
ADD COLUMN     "team0Zings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "team1Zings" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UserStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "soloWins" INTEGER NOT NULL DEFAULT 0,
    "duoWins" INTEGER NOT NULL DEFAULT 0,
    "pointsTaken" INTEGER NOT NULL DEFAULT 0,
    "zingsMade" INTEGER NOT NULL DEFAULT 0,
    "gamesHosted" INTEGER NOT NULL DEFAULT 0,
    "friendsAdded" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "type" "AchievementType" NOT NULL,
    "tier" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");

-- CreateIndex
CREATE INDEX "UserStats_gamesPlayed_idx" ON "UserStats"("gamesPlayed");

-- CreateIndex
CREATE INDEX "UserStats_soloWins_idx" ON "UserStats"("soloWins");

-- CreateIndex
CREATE INDEX "UserStats_duoWins_idx" ON "UserStats"("duoWins");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_type_tier_key" ON "Achievement"("type", "tier");

-- CreateIndex
CREATE INDEX "UserAchievement_userId_unlockedAt_idx" ON "UserAchievement"("userId", "unlockedAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
