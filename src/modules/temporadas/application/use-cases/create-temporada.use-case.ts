import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTemporadaDto } from '../dtos/create-temporada.dto';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { Temporada } from '../../domain/entities/temporada.entity';

@Injectable()
export class CreateTemporadaUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}

  async execute(dto: CreateTemporadaDto): Promise<Temporada> {
    const temporadas = await this.repo.findAll();

    const temporadaActiva = temporadas.find(t => t.activa);
    if (temporadaActiva) {
      throw new BadRequestException(
        `Ya existe una temporada activa: "${temporadaActiva.nombre}". Finalízala antes de crear una nueva.`
      );
    }

    const existeNombre = temporadas.some(
      t => t.nombre.toLowerCase() === dto.nombre.toLowerCase()
    );
    if (existeNombre) {
      throw new BadRequestException(
        `Ya existe una temporada con el nombre "${dto.nombre}".`
      );
    }

    // Crea la temporada en automatico
    return this.repo.create(dto);
  }
}
