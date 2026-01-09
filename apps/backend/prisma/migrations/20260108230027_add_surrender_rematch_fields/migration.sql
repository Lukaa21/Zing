-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "originalRoomIds" JSONB,
ADD COLUMN     "rematchVotes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "surrenderVotes" TEXT[] DEFAULT ARRAY[]::TEXT[];
