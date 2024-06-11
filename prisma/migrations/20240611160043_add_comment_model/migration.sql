-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Agrees', 'Disagrees');

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "argument" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
