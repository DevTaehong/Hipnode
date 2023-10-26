/*
  Warnings:

  - You are about to drop the column `details` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- DropIndex
DROP INDEX "Group_groupName_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "details",
DROP COLUMN "groupName",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "description" VARCHAR(300),
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "groupId" INTEGER;

-- DropTable
DROP TABLE "Membership";

-- CreateTable
CREATE TABLE "_UserGroups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupAdmins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserGroups_AB_unique" ON "_UserGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGroups_B_index" ON "_UserGroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupAdmins_AB_unique" ON "_GroupAdmins"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupAdmins_B_index" ON "_GroupAdmins"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupAdmins" ADD CONSTRAINT "_GroupAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupAdmins" ADD CONSTRAINT "_GroupAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
