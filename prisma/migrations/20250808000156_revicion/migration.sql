-- DropForeignKey
ALTER TABLE `Equipo` DROP FOREIGN KEY `Equipo_entrenadorId_fkey`;

-- DropIndex
DROP INDEX `Equipo_entrenadorId_fkey` ON `equipo`;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_entrenadorId_fkey` FOREIGN KEY (`entrenadorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
