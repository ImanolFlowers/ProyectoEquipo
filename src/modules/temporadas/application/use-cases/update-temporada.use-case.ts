import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateTemporadaDto } from '../dtos/update-temporada.dto';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { Temporada } from '../../domain/entities/temporada.entity';

@Injectable()
export class UpdateTemporadaUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}

  async execute(id: string, dto: UpdateTemporadaDto): Promise<Temporada> {
    if (dto.nombre) {
      const temporadas = await this.repo.findAll();
      const existeNombre = temporadas.some(
        t => t.nombre.toLowerCase() === dto.nombre!.toLowerCase() && t.id !== id
      );
      if (existeNombre) {
        throw new BadRequestException(`Ya existe una temporada con el nombre "${dto.nombre}"`);
      }
    }

    return this.repo.update(id, dto);
  }

  async finalizar(id: string): Promise<Temporada> {
    const temporada = await this.repo.findById(id);
    if (!temporada) throw new BadRequestException(`No existe la temporada con id "${id}"`);

    temporada.finalizar();
    return this.repo.update(id, { activa: temporada.activa } as any);
  }
}
