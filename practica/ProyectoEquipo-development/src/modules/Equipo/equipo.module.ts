import { Module } from '@nestjs/common';
import { EquipoController } from './infraestructure/controllers/equipo.controller';
import { EquipoService } from './equipo.service';
import { PrismaService } from 'src/core/databases/prisma.service';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService, PrismaService],
})
export class EquipoModule {}
