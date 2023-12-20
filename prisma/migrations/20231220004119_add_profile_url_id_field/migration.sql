/*
  Warnings:

  - Made the column `contentType` on table `Interview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentType` on table `MeetUp` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentType` on table `Podcast` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentType` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `profileUrlId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "contentType" SET NOT NULL;

-- AlterTable
ALTER TABLE "MeetUp" ALTER COLUMN "contentType" SET NOT NULL;

-- AlterTable
ALTER TABLE "Podcast" ALTER COLUMN "contentType" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "contentType" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileUrlId" TEXT NOT NULL;
