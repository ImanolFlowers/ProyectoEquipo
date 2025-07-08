/*
  Warnings:

  - You are about to drop the column `estado` on the `temporada` table. All the data in the column will be lost.
  - You are about to drop the column `fin` on the `temporada` table. All the data in the column will be lost.
  - You are about to drop the column `inicio` on the `temporada` table. All the data in the column will be lost.
  - Made the column `updatedAt` on table `temporada` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `temporada` DROP COLUMN `estado`,
    DROP COLUMN `fin`,
    DROP COLUMN `inicio`,
    ADD COLUMN `activa` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `updatedAt` DATETIME(3) NOT NULL;
