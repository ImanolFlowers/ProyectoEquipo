import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaPartidosRepository } from '../../infraestructure/repositories/prisma-partidos.repository';
import { TemporadasRepository } from 'src/modules/temporadas/infraestructure/repositories/prisma-temporadas.repository';
import { EquipoPrismaRepository } from 'src/modules/equipos/infraestructure/repositories/prisma-equipos.repository';
import { CreatePartidoDto } from '../dtos/create-partido.dto';
import { Partido } from '../../domain/entities/partidos.entity';

@Injectable()
export class CreatePartidoUseCase {
  constructor(
    private readonly partidoRepo: PrismaPartidosRepository,
    private readonly temporadaRepo: TemporadasRepository,
    private readonly equipoRepo: EquipoPrismaRepository
  ) {}

  async execute(dto: CreatePartidoDto): Promise<Partido> {
    // Se hace una validacion de equipos distintos
    if (dto.equipoAId === dto.equipoBId) {
      throw new BadRequestException('Un equipo no puede jugar contra sí mismo.');
    }

    // esta es la validacion de si se encuentran los equipos o no
    const equipoA = await this.equipoRepo.findById(dto.equipoAId);
    if (!equipoA) throw new BadRequestException('Equipo A no existe');

    const equipoB = await this.equipoRepo.findById(dto.equipoBId);
    if (!equipoB) throw new BadRequestException('Equipo B no existe');

    // validacion de temporadas activas
    const temporada = await this.temporadaRepo.findActive();
    if (!temporada) throw new BadRequestException('No hay temporada activa para este partido.');

    // combinascion de fercha y hora y su validacion de no agregar fechas que no
    const fechaHora = new Date(`${dto.fecha}T${dto.hora}:00Z`);
    if (fechaHora < new Date()) {
      throw new BadRequestException('La fecha y hora del partido no puede ser en el pasado.');
    }

    // creacion del partido una vez que haya validado
    return this.partidoRepo.create({
      ...dto,
      temporadaId: temporada.id
    });
  }
}
