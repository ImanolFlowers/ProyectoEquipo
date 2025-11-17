import { Test, TestingModule } from '@nestjs/testing';
import { TablaPosicionesController } from './tabla-posiciones.controller';

describe('TablaPosicionesController', () => {
  let controller: TablaPosicionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablaPosicionesController],
    }).compile();

    controller = module.get<TablaPosicionesController>(TablaPosicionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
