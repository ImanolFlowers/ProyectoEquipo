import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { EquipoRepository } from '../../domain/interfaces/equipos-repository.interface';
import { EQUIPO_REPOSITORY } from '../../domain/constants';

@Injectable()
export class DeleteEquipoUseCase {
  constructor(
    @Inject(EQUIPO_REPOSITORY)
    private readonly equipoRepository: EquipoRepository,
  ) {}

  async execute(id: string, entrenadorId: string) {
    const equipo = await this.equipoRepository.findById(id);
    if (!equipo || !equipo.active) {
      throw new NotFoundException('No se encontro equipo para eliminar');
    }
    if (equipo.entrenadorId !== entrenadorId) {
      throw new ForbiddenException('No puedes eliminar equipos de otros usuarios solo el tuyo');
    }
    await this.equipoRepository.softDelete(id);
  }

  async executeAsArbitro(id: string) {
    await this.equipoRepository.softDelete(id);
  }
}
