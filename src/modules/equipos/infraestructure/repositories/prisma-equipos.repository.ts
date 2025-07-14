import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { EquipoRepository } from '../../domain/interfaces/equipos-repository.interface';
import { Equipo } from '../../domain/entities/equipos.entity';
import { EquipoMapper } from '../mappers/equipos.mapper';
import { Prisma } from 'generated/prisma/client';
import { EquipoConEntrenadorDto } from '../../application/dtos/equipo-con-entrenador.dto';

@Injectable()
export class EquipoPrismaRepository implements EquipoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EquipoCreateInput): Promise<Equipo> {
    const created = await this.prisma.equipo.create({ data });
    return EquipoMapper.toDomain(created);
  }

    async findByNombre(nombre: string): Promise<Equipo | null> {
  const equipo = await this.prisma.equipo.findFirst({
    where: {
      nombre: nombre,
      active: true,
    },
  });
  return equipo ? EquipoMapper.toDomain(equipo) : null;
}


  async findById(id: string): Promise<Equipo | null> {
    const equipo = await this.prisma.equipo.findUnique({ where: { id } });
    return equipo ? EquipoMapper.toDomain(equipo) : null;
  }

  async update(id: string, data: Prisma.EquipoUpdateInput): Promise<Equipo> {
    const updated = await this.prisma.equipo.update({ where: { id }, data });
    return EquipoMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.equipo.update({ where: { id }, data: { active: false } });
  }

  async findAllByEntrenador(entrenadorId: string): Promise<EquipoConEntrenadorDto[]> {
    const equipos = await this.prisma.equipo.findMany({
      where: { entrenadorId, active: true },
      include: { entrenador: { select: { name: true, apellido: true } } },
    });
    return equipos.map(EquipoMapper.toDtoWithEntrenador);
  }

  async findAll(): Promise<EquipoConEntrenadorDto[]> {
    const equipos = await this.prisma.equipo.findMany({
      where: { active: true },
      include: { entrenador: { select: { name: true, apellido: true } } },
    });
    return equipos.map(EquipoMapper.toDtoWithEntrenador);
  }
}
