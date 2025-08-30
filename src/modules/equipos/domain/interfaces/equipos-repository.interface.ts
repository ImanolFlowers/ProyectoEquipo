import { Equipo } from '../entities/equipos.entity';
import { Prisma } from 'generated/prisma/client';
import { EquipoConEntrenadorDto } from '../../application/dtos/equipo-con-entrenador.dto';

export interface EquipoRepository {
  create(data: Prisma.EquipoCreateInput): Promise<Equipo>;
  findById(id: string): Promise<Equipo | null>;
  findAllByEntrenador(entrenadorId: string): Promise<EquipoConEntrenadorDto[]>;
  findAll(): Promise<EquipoConEntrenadorDto[]>;
  update(id: string, data: Prisma.EquipoUpdateInput): Promise<Equipo>;
  softDelete(id: string): Promise<void>;
  findByNombre(nombre: string): Promise<Equipo | null>; 
}
