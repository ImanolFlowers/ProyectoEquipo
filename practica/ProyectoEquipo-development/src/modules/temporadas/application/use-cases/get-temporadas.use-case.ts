import { Inject, Injectable } from '@nestjs/common';
import { TemporadasRepository } from '../../infraestructure/repositories/prisma-temporadas.repository';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { UpdateTemporadaDto } from '../dtos/update-temporada.dto';



@Injectable()
export class GetTemporadasUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}
  async execute() { return this.repo.findAll(); }
}

@Injectable()
export class UpdateTemporadaUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}
  async execute(id: string, dto: UpdateTemporadaDto) {
    return this.repo.update(id, dto);
  }
}

@Injectable()
export class DeleteTemporadaUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}
  async execute(id: string) { return this.repo.delete(id); }
}
