import { Module } from '@nestjs/common';
import { PrismaService } from '../../core/databases/prisma.service';
import { EquipoPrismaRepository } from './infraestructure/repositories/prisma-equipos.repository';
import { CreateEquipoUseCase } from './application/use-cases/create-equipos.use-case';
import { UpdateEquipoUseCase } from './application/use-cases/update-equipos.use-case';
import { GetEquiposUseCase } from './application/use-cases/get-equipos.use-case';
import { DeleteEquipoUseCase } from './application/use-cases/delete-equipos.use-case';
import { EquiposController } from './infraestructure/controllers/equipos.controller';
import { EQUIPO_REPOSITORY } from './domain/constants';

@Module({
  controllers: [EquiposController],
  providers: [
    PrismaService,
    EquipoPrismaRepository,
    { provide: EQUIPO_REPOSITORY, useClass: EquipoPrismaRepository },
    CreateEquipoUseCase,
    GetEquiposUseCase,
    UpdateEquipoUseCase,
    DeleteEquipoUseCase,
  ],
})
export class EquiposModule {}
