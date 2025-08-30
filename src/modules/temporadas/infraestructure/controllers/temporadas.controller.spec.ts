import { Test, TestingModule } from '@nestjs/testing';
import { TemporadasController } from './temporadas.controller';
import { CreateTemporadaUseCase } from '../../application/use-cases/create-temporada.use-case';
import { GetTemporadasUseCase } from '../../application/use-cases/get-temporadas.use-case';
import { UpdateTemporadaUseCase } from '../../application/use-cases/update-temporada.use-case';

import { PrismaService } from '../../../../core/databases/prisma.service';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { TemporadasRepository } from '../repositories/prisma-temporadas.repository';
import { DeleteTemporadaUseCase } from '../../application/use-cases/delete-temporada.use-case';

describe('TemporadasController', () => {
  let controller: TemporadasController;
  let temporadasGetUseCase: GetTemporadasUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemporadasController],
      providers: [
        PrismaService,
        { provide: ITemporadasRepository, useClass: TemporadasRepository },
        CreateTemporadaUseCase,
        GetTemporadasUseCase,
        UpdateTemporadaUseCase,
        DeleteTemporadaUseCase,
      ],
    }).compile();

    controller = module.get<TemporadasController>(TemporadasController);
    temporadasGetUseCase = module.get<GetTemporadasUseCase>(GetTemporadasUseCase)
  });

  it('El controlador debe tener unainstancia', () => {
    expect(controller).toBeDefined();
  });

  it('EL temporadasGetUseCase debe tener una instancia del caso de uso', () => {
    expect(temporadasGetUseCase).toBeDefined;
  });

  it('EL temporadasGetUseCase debe tener el metodo execute()', () => {
    expect(temporadasGetUseCase.execute).toBeDefined;
  });
  
});
