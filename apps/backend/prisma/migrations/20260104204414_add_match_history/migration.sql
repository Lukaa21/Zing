-- CreateTable
CREATE TABLE "MatchHistory" (
    "id" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "winnerTeam" INTEGER NOT NULL,
    "team0Score" INTEGER NOT NULL,
    "team1Score" INTEGER NOT NULL,
    "team0Player1Id" TEXT,
    "team0Player1Name" TEXT NOT NULL,
    "team0Player2Id" TEXT,
    "team0Player2Name" TEXT,
    "team1Player1Id" TEXT,
    "team1Player1Name" TEXT NOT NULL,
    "team1Player2Id" TEXT,
    "team1Player2Name" TEXT,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MatchHistory_team0Player1Id_createdAt_idx" ON "MatchHistory"("team0Player1Id", "createdAt");

-- CreateIndex
CREATE INDEX "MatchHistory_team0Player2Id_createdAt_idx" ON "MatchHistory"("team0Player2Id", "createdAt");

-- CreateIndex
CREATE INDEX "MatchHistory_team1Player1Id_createdAt_idx" ON "MatchHistory"("team1Player1Id", "createdAt");

-- CreateIndex
CREATE INDEX "MatchHistory_team1Player2Id_createdAt_idx" ON "MatchHistory"("team1Player2Id", "createdAt");
