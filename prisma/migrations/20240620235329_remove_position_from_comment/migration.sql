/*
  Warnings:

  - You are about to drop the column `position` on the `Comment` table. All the data in the column will be lost.
  - Made the column `birthday` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthday" SET NOT NULL;

-- DropEnum
DROP TYPE "Position";
