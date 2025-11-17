import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTemporadaDto } from '../dtos/update-temporada.dto';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { Temporada } from '../../domain/entities/temporada.entity';

@Injectable()
export class UpdateTemporadaUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}

  async execute(id: string, dto: UpdateTemporadaDto): Promise<Temporada> {
    return this.repo.update(id, dto);
  }

  async finalizar(id: string): Promise<Temporada> {
    const temporada = await this.repo.findById(id);
    

    if (!temporada) {
      throw new NotFoundException(`No existe la temporada con id ${id}`);
    }

    temporada.finalizar();
    return this.repo.update(id, { estado: temporada.estado });
  }
}
