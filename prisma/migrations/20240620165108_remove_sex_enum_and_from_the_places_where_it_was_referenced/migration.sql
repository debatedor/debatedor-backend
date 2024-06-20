/*
  Warnings:

  - You are about to drop the column `sex` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "sex";

-- DropEnum
DROP TYPE "Sex";
