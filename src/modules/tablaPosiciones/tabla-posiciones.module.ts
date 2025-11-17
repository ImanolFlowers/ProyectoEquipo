import { Module } from '@nestjs/common';

import { EQUIPO_REPOSITORY } from '../equipos/domain/constants';
import { EquipoPrismaRepository } from '../equipos/infraestructure/repositories/prisma-equipos.repository';
import { TablaPosicionesController } from './infraestructure/controllers/tabla-posiciones.controller';

import { ListarTablaUseCase } from './application/use-cases/listarTablaGeneral.usecase';
import { TablaGeneralRepository } from './infraestructure/repositories/prisma-tablaPosiciones.repository';
import { PrismaService } from 'src/core/databases/prisma.service';

@Module({
  imports: [], 
  controllers: [TablaPosicionesController],
  providers: [
    PrismaService, 
    EquipoPrismaRepository,
    { provide: 'ITablaGeneralRepository', useClass: TablaGeneralRepository },
    ListarTablaUseCase,
  ],
})
export class TablaPosicionesModule {}