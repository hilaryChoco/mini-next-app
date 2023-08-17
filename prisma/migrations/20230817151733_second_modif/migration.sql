/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `title` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Article_title_key` ON `Article`(`title`);
