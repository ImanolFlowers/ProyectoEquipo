import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { TemporadasController } from './infraestructure/controllers/temporadas.controller';
import { TemporadasRepository } from './infraestructure/repositories/prisma-temporadas.repository';
import { CreateTemporadaUseCase } from './application/use-cases/create-temporada.use-case';
import { GetTemporadasUseCase } from './application/use-cases/get-temporadas.use-case';
import { UpdateTemporadaUseCase } from './application/use-cases/update-temporada.use-case';
import { DeleteTemporadaUseCase } from './application/use-cases/delete-temporada.use-case';
import { ITemporadasRepository } from './domain/interfaces/temporada-repository.interface';

@Module({
  controllers: [TemporadasController],
  providers: [
    PrismaService,
    {
      provide: ITemporadasRepository,
      useClass: TemporadasRepository,
    },
    CreateTemporadaUseCase,
    GetTemporadasUseCase,
    UpdateTemporadaUseCase,
    DeleteTemporadaUseCase,
  ],
})
export class TemporadasModule {}
