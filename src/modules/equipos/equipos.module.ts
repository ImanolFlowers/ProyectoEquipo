import { Module } from '@nestjs/common';
import { EquiposController } from './infraestructure/controllers/equipos.controller';

@Module({
  controllers: [EquiposController]
})
export class EquiposModule {}
