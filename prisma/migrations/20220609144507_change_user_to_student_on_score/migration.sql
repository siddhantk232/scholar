/*
  Warnings:

  - You are about to drop the column `userId` on the `score` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_userId_fkey";

-- AlterTable
ALTER TABLE "score" DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
