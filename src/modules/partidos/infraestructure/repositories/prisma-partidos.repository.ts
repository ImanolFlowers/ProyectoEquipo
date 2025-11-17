import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { CreatePartidoDto } from '../../application/dtos/create-partido.dto';
import { UpdatePartidoDto } from '../../application/dtos/update-partido.dto';
import { Partido } from '../../domain/entities/partidos.entity';
import { PartidoMapper } from '../mappers/partido.mapper';

@Injectable()
export class PrismaPartidosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePartidoDto & { temporadaId: string }): Promise<Partido> {
    const fechaHora = new Date(`${dto.fecha}T${dto.hora}:00Z`);

    const created = await this.prisma.partido.create({
      data: {
        fechaHora,
        lugar: dto.lugar,
        jornada: dto.jornada,
        estado: 'FUTURO',
        temporadaId: dto.temporadaId,
        equipoAId: dto.equipoAId,
        equipoBId: dto.equipoBId,
      },
      include: {
        equipoA: { select: { nombre: true } },
        equipoB: { select: { nombre: true } },
      },
    });

    return PartidoMapper.toDomain(created);
  }

  async update(id: string, dto: UpdatePartidoDto & { fechaHora?: Date }): Promise<Partido> {
    const updated = await this.prisma.partido.update({
      where: { id },
      data: {
        fechaHora: dto.fechaHora,
        lugar: dto.lugar,
        jornada: dto.jornada,
        estado: dto.estado,
        golesEquipoA: dto.golesEquipoA,
        golesEquipoB: dto.golesEquipoB,
        equipoAId: dto.equipoAId,
        equipoBId: dto.equipoBId,
      },
      include: {
        equipoA: { select: { nombre: true } },
        equipoB: { select: { nombre: true } },
      },
    });

    return PartidoMapper.toDomain(updated);
  }

  async findAll(): Promise<Partido[]> {
    const partidos = await this.prisma.partido.findMany({
      include: {
        equipoA: { select: { nombre: true } },
        equipoB: { select: { nombre: true } },
      },
    });
    return partidos.map((p) => PartidoMapper.toDomain(p));
  }

  async findById(id: string): Promise<Partido> {
    const partido = await this.prisma.partido.findUnique({
      where: { id },
      include: {
        equipoA: { select: { nombre: true } },
        equipoB: { select: { nombre: true } },
      },
    });

    if (!partido) throw new NotFoundException(`Partido no encontrado con id ${id}`);
    return PartidoMapper.toDomain(partido);
  }

  async delete(id: string): Promise<Partido> {
    const deleted = await this.prisma.partido.delete({
      where: { id },
      include: {
        equipoA: { select: { nombre: true } },
        equipoB: { select: { nombre: true } },
      },
    });

    return PartidoMapper.toDomain(deleted);
  }

  async findByEquiposYJornada(
    equipoAId: string,
    equipoBId: string,
    jornada: number,
    temporadaId: string
  ): Promise<Partido | null> {
    const partido = await this.prisma.partido.findFirst({
      where: {
        temporadaId,
        jornada,
        OR: [
          { equipoAId, equipoBId },
          { equipoAId: equipoBId, equipoBId: equipoAId },
        ],
      },
      include: {
        equipoA: { select: { nombre: true } },
        equipoB: { select: { nombre: true } },
      },
    });

    return partido ? PartidoMapper.toDomain(partido) : null;
  }
}
