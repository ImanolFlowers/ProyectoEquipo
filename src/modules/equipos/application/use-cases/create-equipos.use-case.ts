import { Injectable, Inject, BadRequestException, ForbiddenException } from '@nestjs/common';
import { EquipoRepository } from '../../domain/interfaces/equipos-repository.interface';
import { CreateEquipoDto } from '../dtos/create-equipos.dto';
import { Prisma } from 'generated/prisma/client';
import { EQUIPO_REPOSITORY } from '../../domain/constants';

@Injectable()
export class CreateEquipoUseCase {
  constructor(
    @Inject(EQUIPO_REPOSITORY)
    private readonly equipoRepository: EquipoRepository,
  ) {}

  async execute(createEquipoDto: CreateEquipoDto, entrenadorId: string, role: string) {
  if (role !== 'ENTRENADOR') {
    throw new ForbiddenException('El ARBITRO no puede crear equipos');
  }

  const equiposExistentes = await this.equipoRepository.findAllByEntrenador(entrenadorId);
  if (equiposExistentes.length > 0) {
    throw new BadRequestException('Este entrenador ya tiene un equipo agregado');
  }

  const nombreExistente = await this.equipoRepository.findByNombre(createEquipoDto.nombre);
  if (nombreExistente) {
    throw new BadRequestException('Ya existe un equipo con ese nombre, elija OTRO');
  }

  const data: Prisma.EquipoCreateInput = {
    nombre: createEquipoDto.nombre,
    escudo: createEquipoDto.escudo ?? null,
    localidad: createEquipoDto.localidad ?? null,
    entrenador: {
      connect: { id: entrenadorId },
    },
    active: true,
  };
  return this.equipoRepository.create(data);
}

}
