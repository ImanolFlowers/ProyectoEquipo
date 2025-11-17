
import { Jugador, Prisma } from 'generated/prisma/client';


export interface JugadorRepository {
  create(data: Prisma.JugadorCreateInput): Promise<Jugador>;
  findAllByEquipo(equipoId: string): Promise<Jugador[]>;
  // muestra todos los jugadores
  findAll(): Promise<Jugador[]>;               
  findById(id: string): Promise<Jugador | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: Prisma.JugadorUpdateInput): Promise<Jugador>;


findByNombreCompleto(nombre: string, apellidos: string): Promise<Jugador | null>;
  findByNumeroEquipo(numero: number, equipoId: string): Promise<Jugador | null>;
}
