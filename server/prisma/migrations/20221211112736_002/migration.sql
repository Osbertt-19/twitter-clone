/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RetweetToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_replied` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RetweetToTag" DROP CONSTRAINT "_RetweetToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_RetweetToTag" DROP CONSTRAINT "_RetweetToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTweet" DROP CONSTRAINT "_TagToTweet_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTweet" DROP CONSTRAINT "_TagToTweet_B_fkey";

-- DropForeignKey
ALTER TABLE "_replied" DROP CONSTRAINT "_replied_A_fkey";

-- DropForeignKey
ALTER TABLE "_replied" DROP CONSTRAINT "_replied_B_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_RetweetToTag";

-- DropTable
DROP TABLE "_TagToTweet";

-- DropTable
DROP TABLE "_replied";
