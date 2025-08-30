import { Module } from '@nestjs/common';
import { EnfrentamientosController } from './partidos.controller';
import { EnfrentamientosService } from './partidos.service';

@Module({
  controllers: [EnfrentamientosController],
  providers: [EnfrentamientosService],
})
export class EnfrentamientosModule {}
