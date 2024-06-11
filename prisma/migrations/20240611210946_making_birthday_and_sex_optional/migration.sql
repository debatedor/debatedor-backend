/*
  Warnings:

  - Added the required column `lastname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MASCULINO', 'FEMININO');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "sex" "Sex";
