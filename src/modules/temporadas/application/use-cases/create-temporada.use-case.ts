import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTemporadaDto } from '../dtos/create-temporada.dto';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { Temporada } from '../../domain/entities/temporada.entity';

@Injectable()
export class CreateTemporadaUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}

  async execute(dto: CreateTemporadaDto): Promise<Temporada> {
    const active = await this.repo.findActive();
    if (active) {
      throw new BadRequestException('Ya existe una temporada activa. Finalízala antes de crear una nueva.');
    }
    return this.repo.create(dto);
  }
}
