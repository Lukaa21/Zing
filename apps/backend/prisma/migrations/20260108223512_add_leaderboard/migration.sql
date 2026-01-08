-- CreateEnum
CREATE TYPE "LeaderboardCategory" AS ENUM ('WINS', 'ZINGS', 'POINTS');

-- CreateEnum
CREATE TYPE "LeaderboardPeriod" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY', 'ALL_TIME');

-- CreateTable
CREATE TABLE "LeaderboardSnapshot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "category" "LeaderboardCategory" NOT NULL,
    "period" "LeaderboardPeriod" NOT NULL,
    "value" INTEGER NOT NULL,
    "weekStart" TIMESTAMP(3),
    "monthStart" TIMESTAMP(3),
    "yearStart" TIMESTAMP(3),
    "rank" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaderboardSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_category_period_weekStart_value_idx" ON "LeaderboardSnapshot"("category", "period", "weekStart", "value");

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_category_period_monthStart_value_idx" ON "LeaderboardSnapshot"("category", "period", "monthStart", "value");

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_category_period_yearStart_value_idx" ON "LeaderboardSnapshot"("category", "period", "yearStart", "value");

-- CreateIndex
CREATE INDEX "LeaderboardSnapshot_category_period_value_idx" ON "LeaderboardSnapshot"("category", "period", "value");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardSnapshot_userId_category_period_weekStart_monthS_key" ON "LeaderboardSnapshot"("userId", "category", "period", "weekStart", "monthStart", "yearStart");

-- AddForeignKey
ALTER TABLE "LeaderboardSnapshot" ADD CONSTRAINT "LeaderboardSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
