/*
  Warnings:

  - Made the column `title` on table `article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NULL;
