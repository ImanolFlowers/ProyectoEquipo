import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPartidosRepository } from '../../infraestructure/repositories/prisma-partidos.repository';
import { Partido } from '../../domain/entities/partidos.entity';

@Injectable()
export class GetPartidosUseCase {
  constructor(private readonly partidoRepo: PrismaPartidosRepository) {}

  async findAll(): Promise<Partido[]> {
    return this.partidoRepo.findAll();
  }

  async findById(id: string): Promise<Partido> {
    const partido = await this.partidoRepo.findById(id);
    if (!partido) throw new NotFoundException(`Partido no encontrado con id ${id}`);
    return partido;
  }
}
