-- CreateTable
CREATE TABLE "RoundScore" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "team" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoundScore_pkey" PRIMARY KEY ("id")
);
