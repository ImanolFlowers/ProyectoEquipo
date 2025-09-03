/*
  Warnings:

  - You are about to drop the column `activa` on the `temporada` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `temporada` DROP COLUMN `activa`,
    ADD COLUMN `estado` ENUM('ACTIVA', 'FINALIZADA') NOT NULL DEFAULT 'ACTIVA';
