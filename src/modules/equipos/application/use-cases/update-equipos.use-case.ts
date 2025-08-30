import {Injectable, NotFoundException, ForbiddenException, Inject, BadRequestException} from '@nestjs/common';
import { EquipoRepository } from '../../domain/interfaces/equipos-repository.interface';
import { UpdateEquipoDto } from '../dtos/update-equipos.dto';
import { EQUIPO_REPOSITORY } from '../../domain/constants';

@Injectable()
export class UpdateEquipoUseCase {
  constructor(
    @Inject(EQUIPO_REPOSITORY)
    private readonly equipoRepo: EquipoRepository,
  ) {}

  async execute(id: string, dto: UpdateEquipoDto, entrenadorId: string) {
    const equipo = await this.equipoRepo.findById(id);
    if (!equipo || !equipo.active)
      throw new NotFoundException('No se encontro equipo para actualizar');
    if (equipo.entrenadorId !== entrenadorId)
      throw new ForbiddenException('No autorizado');

    if (dto.nombre) {
      const existente = await this.equipoRepo.findByNombre(dto.nombre);
      if (existente && existente.id !== id) {
        throw new BadRequestException('Ya existe un equipo con ese nombre');
      }
    }

    return this.equipoRepo.update(id, dto);
  }

  async executeAsArbitro(id: string, dto: UpdateEquipoDto) {
    const equipo = await this.equipoRepo.findById(id);
    if (!equipo || !equipo.active)
      throw new NotFoundException('Equipo no encontrado');

    if (dto.nombre) {
      const existente = await this.equipoRepo.findByNombre(dto.nombre);
      if (existente && existente.id !== id) {
        throw new BadRequestException('Ya existe un equipo con ese nombre');
      }
    }
    return this.equipoRepo.update(id, dto);
  }
}
