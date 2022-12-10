/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `slug` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RetweetToTag" DROP CONSTRAINT "_RetweetToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTweet" DROP CONSTRAINT "_TagToTweet_A_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "slug",
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagName");

-- AddForeignKey
ALTER TABLE "_RetweetToTag" ADD CONSTRAINT "_RetweetToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTweet" ADD CONSTRAINT "_TagToTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;
