import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { CreateTemporadaDto } from '../../application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';

@Injectable()
export class TemporadasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTemporadaDto) {
    return this.prisma.temporada.create({ data: { nombre: dto.nombre } });
  }

  async findAll() {
    return this.prisma.temporada.findMany();
  }

  async update(id: string, dto: UpdateTemporadaDto) {
  const temporada = await this.prisma.temporada.findUnique({ where: { id } });
  if (!temporada) {
    throw new NotFoundException(`No se encontró la temporada con id ${id}`);
  }
  return this.prisma.temporada.update({
    where: { id },
    data: dto,
  });
}

  async delete(id: string) {
  const temporada = await this.prisma.temporada.findUnique({ where: { id } });
  if (!temporada) {
  throw new NotFoundException(`No se encontró la temporada con id ${id}`);
}
  return this.prisma.temporada.delete({ where: { id } });
}

}
