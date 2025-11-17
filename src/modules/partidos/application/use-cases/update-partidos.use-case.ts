import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaPartidosRepository } from '../../infraestructure/repositories/prisma-partidos.repository';
import { EquipoPrismaRepository } from 'src/modules/equipos/infraestructure/repositories/prisma-equipos.repository';
import { UpdatePartidoDto } from '../dtos/update-partido.dto';
import { Partido, EstadoPartido } from '../../domain/entities/partidos.entity';

@Injectable()
export class UpdatePartidoUseCase {
  constructor(
    private readonly partidoRepo: PrismaPartidosRepository,
    private readonly equipoRepo: EquipoPrismaRepository
  ) {}

  async execute(id: string, dto: UpdatePartidoDto): Promise<Partido> {
    const partidoExistente = await this.partidoRepo.findById(id);
    if (!partidoExistente) {
      throw new NotFoundException(`Partido no encontrado con id ${id}`);
    }

    // Aseguramos que nunca sean undefined
    const nuevoEquipoA: string = dto.equipoAId ?? partidoExistente.equipoAId;
  const nuevoEquipoB: string = dto.equipoBId ?? partidoExistente.equipoBId!;


    if (nuevoEquipoA === nuevoEquipoB) {
      throw new BadRequestException('Un equipo no puede jugar contra sí mismo.');
    }

    if (dto.equipoAId) {
      const equipoA = await this.equipoRepo.findById(dto.equipoAId);
      if (!equipoA) throw new BadRequestException('Equipo A no existe.');
    }

    if (dto.equipoBId) {
      const equipoB = await this.equipoRepo.findById(dto.equipoBId);
      if (!equipoB) throw new BadRequestException('Equipo B no existe.');
    }

    let fechaHora: Date | undefined;
    if (dto.fecha || dto.hora) {
      const fecha = dto.fecha ?? partidoExistente.fechaHora.toISOString().split('T')[0];
      const hora = dto.hora ?? partidoExistente.fechaHora.toISOString().split('T')[1].slice(0, 5);
      fechaHora = new Date(`${fecha}T${hora}:00Z`);

      if (fechaHora < new Date()) {
        throw new BadRequestException('La fecha y hora del partido no puede ser en el pasado.');
      }
    }

    switch (partidoExistente.estado) {
      case EstadoPartido.FUTURO:
        if (dto.golesEquipoA !== undefined || dto.golesEquipoB !== undefined) {
          throw new BadRequestException('No se pueden modificar los goles antes de iniciar el partido.');
        }
        break;

      case EstadoPartido.CANCELADO:
        if (
          dto.fecha ||
          dto.hora ||
          dto.lugar ||
          dto.jornada ||
          dto.equipoAId ||
          dto.equipoBId ||
          dto.golesEquipoA ||
          dto.golesEquipoB
        ) {
          throw new BadRequestException('No puedes modificar nada cuando está cancelado.');
        }
        break;

      case EstadoPartido.EN_JUEGO:
        if (dto.fecha || dto.hora || dto.lugar || dto.jornada || dto.equipoAId || dto.equipoBId) {
          throw new BadRequestException('Mientras el partido está en juego, solo se pueden modificar goles y estado.');
        }
        break;

      case EstadoPartido.FINALIZADO:
        if (
          partidoExistente.estado === EstadoPartido.FINALIZADO ||
          (dto.estado && dto.estado !== EstadoPartido.CANCELADO)
        ) {
          throw new BadRequestException('No se pueden modificar los campos de este partido.');
        }
        break;
    }

    const jornadaFinal = dto.jornada ?? partidoExistente.jornada;

    // ✅ Aquí aseguramos que los IDs nunca sean undefined
    const partidoDuplicado = await this.partidoRepo.findByEquiposYJornada(
      nuevoEquipoA,
      nuevoEquipoB,
      jornadaFinal,
      partidoExistente.temporadaId
    );

    if (partidoDuplicado && partidoDuplicado.id !== id) {
      throw new BadRequestException(
        'Ya existe un partido entre estos equipos en esta jornada y temporada.'
      );
    }

    // ✅ Finalmente actualizamos el partido
    return this.partidoRepo.update(id, {
      fechaHora,
      lugar: dto.lugar,
      jornada: dto.jornada,
      estado: dto.estado,
      golesEquipoA: dto.golesEquipoA,
      golesEquipoB: dto.golesEquipoB,
      equipoAId: dto.equipoAId,
      equipoBId: dto.equipoBId,
    });
  }
}
