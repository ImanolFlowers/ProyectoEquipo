import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateTemporadaDto } from '../dtos/update-temporada.dto';
import { TemporadasRepository } from '../../infraestructure/repositories/prisma-temporadas.repository';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';
import { Temporada } from '../../domain/entities/temporada.entity';


@Injectable()
export class UpdateTemporadaUseCase {
  constructor(
    private readonly repo: ITemporadasRepository,
  ) {}

  // valida lo que es el dtoNombre, si existe lo registra, sino lo vota
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

}