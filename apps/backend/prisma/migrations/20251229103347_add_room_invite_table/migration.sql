-- CreateEnum
CREATE TYPE "RoomInviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED', 'EXPIRED');

-- CreateTable
CREATE TABLE "RoomInvite" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "inviteeId" TEXT NOT NULL,
    "status" "RoomInviteStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "RoomInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoomInvite_roomId_idx" ON "RoomInvite"("roomId");

-- CreateIndex
CREATE INDEX "RoomInvite_inviteeId_idx" ON "RoomInvite"("inviteeId");

-- CreateIndex
CREATE INDEX "RoomInvite_inviterId_idx" ON "RoomInvite"("inviterId");

-- CreateIndex
CREATE INDEX "RoomInvite_status_idx" ON "RoomInvite"("status");

-- CreateIndex
CREATE INDEX "RoomInvite_expiresAt_idx" ON "RoomInvite"("expiresAt");

-- CreateIndex
CREATE INDEX "RoomInvite_roomId_inviteeId_status_idx" ON "RoomInvite"("roomId", "inviteeId", "status");

-- AddForeignKey
ALTER TABLE "RoomInvite" ADD CONSTRAINT "RoomInvite_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInvite" ADD CONSTRAINT "RoomInvite_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
