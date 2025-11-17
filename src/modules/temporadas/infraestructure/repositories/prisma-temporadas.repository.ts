import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { Temporada } from '../../domain/entities/temporada.entity';
import { TemporadaMapper } from '../mappers/temporada.mapper';
import { EstadoTemporada } from '../../../../../generated/prisma';
import { CreateTemporadaDto } from '../../application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';

@Injectable()
export class TemporadasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTemporadaDto): Promise<Temporada> {
    const data = {
      estado: EstadoTemporada.ACTIVA,
    };
    const temporada = await this.prisma.temporada.create({ data });
    return TemporadaMapper.toDomain(temporada);
  }

  async findAll(): Promise<Temporada[]> {
    const temporadas = await this.prisma.temporada.findMany();
    return temporadas.map(TemporadaMapper.toDomain);
  }

  async findById(id: string): Promise<Temporada> {
    const temporada = await this.prisma.temporada.findUnique({ where: { id } });
    if (!temporada) throw new NotFoundException(`No se encontró la temporada con id ${id}`);
    return TemporadaMapper.toDomain(temporada);
  }

  async findActive(): Promise<Temporada | null> {
    const temporada = await this.prisma.temporada.findFirst({ where: { estado: EstadoTemporada.ACTIVA } });
    return temporada ? TemporadaMapper.toDomain(temporada) : null;
  }

  async update(id: string, dto: UpdateTemporadaDto | any): Promise<Temporada> {
    const temporada = await this.prisma.temporada.findUnique({ where: { id } });
    if (!temporada) throw new NotFoundException(`No se encontró la temporada con id ${id}`);

    const data = TemporadaMapper.toUpdateData(dto);
    const updated = await this.prisma.temporada.update({ where: { id }, data });
    return TemporadaMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    const temporada = await this.prisma.temporada.findUnique({ where: { id } });
    if (!temporada) throw new NotFoundException(`No se encontró la temporada con id ${id}`);
    await this.prisma.temporada.delete({ where: { id } });
  }
}
