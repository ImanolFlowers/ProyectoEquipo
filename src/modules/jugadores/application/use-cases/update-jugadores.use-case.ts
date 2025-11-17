import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { JugadorRepository } from '../../domain/interfaces/jugadores-repository.interface';

import { EQUIPO_REPOSITORY } from '../../../equipos/domain/constants';
import { EquipoRepository } from '../../../equipos/domain/interfaces/equipos-repository.interface';
import { UpdateJugadorDto } from '../dtos/update-jugadores.dto';

@Injectable()
export class UpdateJugadorUseCase {
  constructor(
    @Inject('JUGADOR_REPOSITORY')
    private readonly jugadorRepository: JugadorRepository,
    @Inject(EQUIPO_REPOSITORY)
    private readonly equipoRepository: EquipoRepository,
  ) {}

  async execute(id: string, dto: UpdateJugadorDto, entrenadorId: string, role: string) {
    // solo los entrenadores o árbitros pueden actualizar
    if (role !== 'ENTRENADOR' && role !== 'ARBITRO') {
      throw new ForbiddenException('Solo entrenadores o árbitros pueden actualizar jugadores');
    }

    // validacion de buscar jugador existente
    const jugador = await this.jugadorRepository.findById(id);
    if (!jugador) {
      throw new NotFoundException('Jugador no encontrado');
    }

    // validacion del entrenador que es su equipo
    if (role === 'ENTRENADOR') {
      const equipos = await this.equipoRepository.findAllByEntrenador(entrenadorId);
      const equipoIds = equipos.map(e => e.id);

      if (!equipoIds.includes(jugador.equipoId)) {
        throw new ForbiddenException(
          'No puedes actualizar un jugador que no pertenece a tu equipo'
        );
      }
    }

    // validaciones de nombres existentes
    if (dto.nombre && dto.apellidos) {
      const existingJugador = await this.jugadorRepository.findByNombreCompleto(dto.nombre, dto.apellidos);
      if (existingJugador && existingJugador.id !== id) {
        throw new BadRequestException(`El jugador ${dto.nombre} ${dto.apellidos} ya existe`);
      }
    }

    if (dto.numero !== undefined) {
      const existingNumero = await this.jugadorRepository.findByNumeroEquipo(dto.numero, jugador.equipoId);
      if (existingNumero && existingNumero.id !== id) {
        throw new BadRequestException(`El número ${dto.numero} ya está asignado a otro jugador en el equipo`);
      }
    }

    // datos para el prisma
    const data: Prisma.JugadorUpdateInput = {
      nombre: dto.nombre,
      apellidos: dto.apellidos,
      numero: dto.numero,
      posicion: dto.posicion,
      posicionDetalle: dto.posicionDetalle ?? null,
      foto: dto.foto ?? null,
    };

    return this.jugadorRepository.update(id, data);
  }
}
