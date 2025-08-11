import { Test, TestingModule } from '@nestjs/testing';
import { EquipoService } from './equipo.service';
import { PrismaService } from 'src/core/databases/prisma.service';

const prismaEquipoMock = {
  equipo: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
};

describe('EquipoService', () => {
  let service: EquipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipoService,
        {
          provide: PrismaService,
          useValue: prismaEquipoMock,
        },
      ],
    }).compile();

    service = module.get<EquipoService>(EquipoService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
