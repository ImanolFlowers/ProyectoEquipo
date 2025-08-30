import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { PrismaService } from '../../core/databases/prisma.service';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UsersService],
        exports: [UsersService],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('El controlador debe tener instancias', () => {
    expect(controller).toBeDefined();
  });

  it('El user debe tener una instancia', () => {
    expect(service).toBeDefined();
  });

  it('El service debe tener el metodo createUser para crear', () => {
    expect(service.createUser).toBeDefined();
  });

  it('El service debe tener el metodo deleteUser para eliminar', () => {
    expect(service.deleteUser).toBeDefined();
  })
});
