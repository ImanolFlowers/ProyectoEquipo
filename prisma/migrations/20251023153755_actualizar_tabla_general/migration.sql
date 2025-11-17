-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `telefono` VARCHAR(191) NULL,
    `apellido` VARCHAR(191) NULL,
    `role` ENUM('ARBITRO', 'ENTRENADOR', 'VISITANTE') NOT NULL DEFAULT 'VISITANTE',

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Temporada` (
    `id` VARCHAR(191) NOT NULL,
    `estado` ENUM('ACTIVA', 'FINALIZADA') NOT NULL DEFAULT 'ACTIVA',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipo` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `escudo` VARCHAR(191) NULL,
    `localidad` VARCHAR(191) NULL,
    `entrenadorId` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jugador` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `posicion` ENUM('PORTERO', 'DEFENSA', 'MEDIO', 'DELANTERO') NOT NULL,
    `posicionDetalle` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,
    `equipoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partido` (
    `id` VARCHAR(191) NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL,
    `lugar` VARCHAR(191) NOT NULL,
    `estado` ENUM('FUTURO', 'EN_JUEGO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'FUTURO',
    `jornada` INTEGER NOT NULL,
    `temporadaId` VARCHAR(191) NOT NULL,
    `equipoAId` VARCHAR(191) NOT NULL,
    `equipoBId` VARCHAR(191) NOT NULL,
    `golesEquipoA` INTEGER NOT NULL DEFAULT 0,
    `golesEquipoB` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TablaGeneral` (
    `id` VARCHAR(191) NOT NULL,
    `num` INTEGER NOT NULL DEFAULT 0,
    `equipoId` VARCHAR(191) NOT NULL,
    `PJ` INTEGER NOT NULL DEFAULT 0,
    `PG` INTEGER NOT NULL DEFAULT 0,
    `PE` INTEGER NOT NULL DEFAULT 0,
    `PP` INTEGER NOT NULL DEFAULT 0,
    `GF` INTEGER NOT NULL DEFAULT 0,
    `GC` INTEGER NOT NULL DEFAULT 0,
    `DIF` INTEGER NOT NULL DEFAULT 0,
    `Pts` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_entrenadorId_fkey` FOREIGN KEY (`entrenadorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jugador` ADD CONSTRAINT `Jugador_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partido` ADD CONSTRAINT `Partido_temporadaId_fkey` FOREIGN KEY (`temporadaId`) REFERENCES `Temporada`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partido` ADD CONSTRAINT `Partido_equipoAId_fkey` FOREIGN KEY (`equipoAId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partido` ADD CONSTRAINT `Partido_equipoBId_fkey` FOREIGN KEY (`equipoBId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TablaGeneral` ADD CONSTRAINT `TablaGeneral_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
