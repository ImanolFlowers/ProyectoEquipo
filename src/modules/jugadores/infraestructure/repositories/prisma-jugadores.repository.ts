import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../../core/databases/prisma.service';

import { Jugador, Prisma } from 'generated/prisma/client';

import { JugadorMapper } from '../mappers/jugadores.mapper';
import { JugadorRepository } from '../../domain/interfaces/jugadores-repository.interface';

@Injectable()
export class JugadorPrismaRepository implements JugadorRepository {
  constructor(private readonly prisma: PrismaService) {}


  //crea el jugador
  async create(data: Prisma.JugadorCreateInput): Promise<Jugador> {
    try {
      const jugador = await this.prisma.jugador.create({ data });
      return JugadorMapper.toDomain(jugador);
    } catch (error) {
      if (error.code === 'P2000' || error.code === 'P2003' || error.code === 'P2025') {
        throw new BadRequestException('Error de validación con los datos enviados.');
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(
          'El valor de "posicion" no es válido. Usa uno de los valores definidos en el enum Posicion.'
        );
      }
      throw new InternalServerErrorException('Ocurrió un error al crear el jugador.');
    }
  }
//muestra los jugadores de equipo
  async findAllByEquipo(equipoId: string): Promise<Jugador[]> {
  const jugadores = await this.prisma.jugador.findMany({
    where: { equipoId },
    // solo nombre del equipo
    include: { equipo: { select: { nombre: true } } }, 
  });
  return jugadores.map(JugadorMapper.toDomain);
}


  async findAll(): Promise<Jugador[]> {
    const jugadores = await this.prisma.jugador.findMany({
      include: { equipo: { select: { nombre: true } } },
    });
    return jugadores.map(JugadorMapper.toDomain);
  }

  async findById(id: string): Promise<Jugador | null> {
    const jugador = await this.prisma.jugador.findUnique({
      where: { id },
      include: { equipo: { select: { nombre: true } } },
    });
    return jugador ? JugadorMapper.toDomain(jugador) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.jugador.delete({ where: { id } });
  }

  // esots son metodos para las validaciones
  async findByNombreCompleto(nombre: string, apellidos: string): Promise<Jugador | null> {
    const jugador = await this.prisma.jugador.findFirst({
      where: { nombre, apellidos },
    });
    return jugador ? JugadorMapper.toDomain(jugador) : null;
  }

  async findByNumeroEquipo(numero: number, equipoId: string): Promise<Jugador | null> {
    const jugador = await this.prisma.jugador.findFirst({
      where: { numero, equipoId },
    });
    return jugador ? JugadorMapper.toDomain(jugador) : null;
  }

  //la actualizacion de jugadores
  async update(id: string, data: Prisma.JugadorUpdateInput): Promise<Jugador> {
  const jugador = await this.prisma.jugador.update({
    where: { id },
    data,
    include: { equipo: { select: { nombre: true } } },
  });
  return JugadorMapper.toDomain(jugador);
}

}
