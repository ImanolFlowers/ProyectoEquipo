import { Test, TestingModule } from '@nestjs/testing';
import { TemporadasService } from './temporadas.service';
import { PrismaService } from 'src/core/databases/prisma.service';

const prismaTemporadaMock = {
  create: jest.fn(),
  findMany: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('TemporadasService', () => {
  let service: TemporadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemporadasService,
        {
          provide: PrismaService,
          useValue: {
            temporada: prismaTemporadaMock,
          },
        },
      ],
    }).compile();

    service = module.get<TemporadasService>(TemporadasService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create calls prisma.temporada.create', async () => {
    const dto = { nombre: 'Temporada Test' };
    const retorno = { id: '1', nombre: 'Temporada Test' };
    prismaTemporadaMock.create.mockResolvedValue(retorno);

    await expect(service.create(dto)).resolves.toEqual(retorno);
    expect(prismaTemporadaMock.create).toHaveBeenCalledWith({
      data: { nombre: dto.nombre },
    });
  });

  it('findAll calls prisma.temporada.findMany', async () => {
    const retorno = [{ id: '1', nombre: 'Temporada Test' }];
    prismaTemporadaMock.findMany.mockResolvedValue(retorno);

    await expect(service.findAll()).resolves.toEqual(retorno);
    expect(prismaTemporadaMock.findMany).toHaveBeenCalled();
  });

  it('update calls prisma.temporada.update', async () => {
    const id = '1';
    const dto = { nombre: 'Modificado' };
    const retorno = { id, nombre: 'Modificado' };
    prismaTemporadaMock.update.mockResolvedValue(retorno);

    await expect(service.update(id, dto)).resolves.toEqual(retorno);
    expect(prismaTemporadaMock.update).toHaveBeenCalledWith({
      where: { id },
      data: dto,
    });
  });

  it('delete calls prisma.temporada.delete', async () => {
    const id = '1';
    const retorno = { id, nombre: 'Eliminada' };
    prismaTemporadaMock.delete.mockResolvedValue(retorno);

    await expect(service.delete(id)).resolves.toEqual(retorno);
    expect(prismaTemporadaMock.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });
});
