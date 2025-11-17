import { Module } from '@nestjs/common';
import { PartidosController } from './infraestructure/controllers/partidos.controller';
import { PrismaService } from 'src/core/databases/prisma.service';
import { PrismaPartidosRepository } from './infraestructure/repositories/prisma-partidos.repository';
import { EquipoPrismaRepository } from '../equipos/infraestructure/repositories/prisma-equipos.repository';
import { TemporadasRepository } from '../temporadas/infraestructure/repositories/prisma-temporadas.repository';

import { CreatePartidoUseCase } from './application/use-cases/create-partido.usecase';
import { GetPartidosUseCase } from './application/use-cases/get-partidos.usecase';
import { UpdatePartidoUseCase } from './application/use-cases/update-partidos.use-case';
import { DeletePartidoUseCase } from './application/use-cases/delete-partido.usecase';


@Module({
  controllers: [PartidosController],
  providers: [
    PrismaService,
    PrismaPartidosRepository,
    EquipoPrismaRepository,
    TemporadasRepository,
    CreatePartidoUseCase,
    UpdatePartidoUseCase,
    GetPartidosUseCase,
    DeletePartidoUseCase
  ],
  exports: [
    PrismaPartidosRepository,
    EquipoPrismaRepository,
    TemporadasRepository,
    CreatePartidoUseCase,
    UpdatePartidoUseCase,
    GetPartidosUseCase,
    DeletePartidoUseCase
  ],
})
export class PartidosModule {}
