/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable - set default values for existing rows
ALTER TABLE "User" ADD COLUMN "displayName" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN "email" TEXT NOT NULL DEFAULT 'temp@example.com',
ADD COLUMN "passwordHash" TEXT NOT NULL DEFAULT '',
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Remove defaults after adding columns
ALTER TABLE "User" ALTER COLUMN "displayName" DROP DEFAULT,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "passwordHash" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
