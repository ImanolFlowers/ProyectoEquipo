import { Equipo } from "../entities/equipos";

export interface IEquipoRepository {
  create(equipo: Equipo): Promise<Equipo | null>;
  getAll(): Promise<Equipo[]>;
  getById(id: string): Promise<Equipo | null>;
}
