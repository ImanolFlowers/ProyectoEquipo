import { Injectable, Inject, BadRequestException, ForbiddenException, ConflictException } from '@nestjs/common';
import { EQUIPO_REPOSITORY } from '../../../equipos/domain/constants';
import { EquipoRepository } from '../../../equipos/domain/interfaces/equipos-repository.interface';
import { Prisma } from 'generated/prisma/client';
import { JugadorRepository } from '../../domain/interfaces/jugadores-repository.interface';
import { CreateJugadorDto } from '../dtos/create-jugadores.dto';

@Injectable()
export class CreateJugadorUseCase {
  constructor(
    @Inject('JUGADOR_REPOSITORY')
    private readonly jugadorRepository: JugadorRepository,
    @Inject(EQUIPO_REPOSITORY)
    private readonly equipoRepository: EquipoRepository,
  ) {}

  async execute(dto: CreateJugadorDto, entrenadorId: string, role: string) {
    if (role !== 'ENTRENADOR') {
      throw new ForbiddenException('Solo los entrenadores pueden crear jugadores');
    }

    const equipos = await this.equipoRepository.findAllByEntrenador(entrenadorId);
    if (equipos.length === 0) {
      throw new BadRequestException('Primero debes crear un equipo');
    }

    // se toma el primer equipo del entrenador
    const equipo = equipos[0]; 

    // esta validacion junta en una cadena el nombre y apellido y asi evitamos
    //tener personas en otro equipo
    const jugadorExistente = await this.jugadorRepository.findByNombreCompleto(
      dto.nombre,
      dto.apellidos
    );
    if (jugadorExistente) {
      throw new BadRequestException(
        `Ya existe un jugador con nombre ${dto.nombre} ${dto.apellidos}`
      );
    }

    // esta es la validacion de numeros para los jugadoress, evita repetir en el mismo equiois
    const numeroExistente = await this.jugadorRepository.findByNumeroEquipo(
      dto.numero,
      equipo.id
    );
    if (numeroExistente) {
      throw new BadRequestException(
        `El número ${dto.numero} ya está asignado a otro jugador en este equipo`
      );
    }

    const data: Prisma.JugadorCreateInput = {
      nombre: dto.nombre,
      apellidos: dto.apellidos,
      numero: dto.numero,
      posicion: dto.posicion,
      posicionDetalle: dto.posicionDetalle ?? null,
      foto: dto.foto ?? null,
      equipo: { connect: { id: equipo.id } },
    };

    return this.jugadorRepository.create(data);
  }
}
