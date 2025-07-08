/*
  Warnings:

  - You are about to drop the column `activa` on the `temporada` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `temporada` 
  DROP COLUMN `activa`,
  ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'activa',
  ADD COLUMN `fin` DATETIME(3) NULL,
  ADD COLUMN `inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3);
