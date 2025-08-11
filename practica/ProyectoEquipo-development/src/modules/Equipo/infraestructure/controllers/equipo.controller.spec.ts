import { Test, TestingModule } from '@nestjs/testing';
import { EquipoController } from './equipo.controller';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { EquipoService } from '../../equipo.service';

describe('EquipoController', () => {
  let controller: EquipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipoController],
      providers: [
        EquipoService,
        {
          provide: PrismaService,
          useValue: {
            // Aquí puedes mockear métodos que use tu servicio
            equipo: {
              findMany: jest.fn().mockResolvedValue([]),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<EquipoController>(EquipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
