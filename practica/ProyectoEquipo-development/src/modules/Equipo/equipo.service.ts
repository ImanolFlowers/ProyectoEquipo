import { Injectable } from '@nestjs/common';
import { CreateEquipoDto } from './application/dtos/create-equipo.dto';
import { UpdateEquipoDto } from './application/dtos/update-equipo.dto';
import { PrismaService } from 'src/core/databases/prisma.service';

@Injectable()
export class EquipoService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Crea un nuevo equipo.
   * Escudo y location son opcionales.
   */
  async create(dto: CreateEquipoDto) {
  // Prepara un objeto 'data' para Prisma, solo con los campos que tengan valor
  const data: any = {
    nombre: dto.nombre,
    escudo: dto.escudo,
    
  };

  // Asigna 'representante' solo si viene definido
  if (dto.representante !== undefined) {
    data.representante = dto.representante;
  }

  // Asigna 'location' solo si viene definido y no es null
  if (dto.location) {
    data.location = dto.location;
  }

  // Llama a Prisma para crear el registro
  return await this.prismaService.equipo.create({
    data,
  });
}


  /**
   * Retorna todos los equipos registrados.
   */
  findAll() {
    return this.prismaService.equipo.findMany();
  }

  /**
   * Actualiza un equipo por su ID.
   */
  update(id: string, dto: UpdateEquipoDto) {
    return this.prismaService.equipo.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * Elimina un equipo por su ID.
   */
  delete(id: string) {
    return this.prismaService.equipo.delete({
      where: { id },
    });
  }
}
