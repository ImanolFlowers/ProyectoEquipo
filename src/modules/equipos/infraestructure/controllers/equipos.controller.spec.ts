import { Test, TestingModule } from '@nestjs/testing';
import { EquiposController } from './equipos.controller';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { EquipoPrismaRepository } from '../repositories/prisma-equipos.repository';
import { EQUIPO_REPOSITORY } from '../../domain/constants';
import { CreateEquipoUseCase } from '../../application/use-cases/create-equipos.use-case';
import { GetEquiposUseCase } from '../../application/use-cases/get-equipos.use-case';
import { UpdateEquipoUseCase } from '../../application/use-cases/update-equipos.use-case';
import { DeleteEquipoUseCase } from '../../application/use-cases/delete-equipos.use-case';

describe('EquiposController', () => {
  let controller: EquiposController;
  let equiposGet: GetEquiposUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<EquiposController>(EquiposController);
    equiposGet = module.get<GetEquiposUseCase>(GetEquiposUseCase);

  });

  it('El controlador debe tener una instancia', () => {
    expect(controller).toBeDefined();
  });

  it('El equiposGet debe tener una instancia en el caso de usos', () => {
    expect(equiposGet).toBeDefined();
  });

  it('El equiposGet debe tene un metodo excecute', () => {
    expect(equiposGet.execute).toBeDefined();
  })
});
