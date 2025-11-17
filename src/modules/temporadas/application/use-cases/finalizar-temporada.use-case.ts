import { BadRequestException, Injectable } from '@nestjs/common';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { Temporada } from '../../domain/entities/temporada.entity';

@Injectable()
export class FinalizarTemporadaUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}

  async execute(id: string): Promise<Temporada> {
    // buca la temporada
    const temporada = await this.repo.findById(id);
    if (!temporada) throw new BadRequestException(`No existe la temporada con id "${id}"`);

    // finaliza la temporada en la entidad
    temporada.finalizar(); 

    // actualiza en la base de datos utilizando el mapper
    return this.repo.update(id, { estado: 'FINALIZADA' } as any);
  }
}
