import { CreatePartidoDto } from "../../application/dtos/create-partido.dto";
import { UpdatePartidoDto } from "../../application/dtos/update-partido.dto";
import { Partido } from "../entities/partidos.entity";


export interface PartidoRepository {
  create(data: CreatePartidoDto): Promise<Partido>;
  update(id: string, data: UpdatePartidoDto): Promise<Partido>;
  findById(id: string): Promise<Partido | null>;
  findAll(): Promise<Partido[]>;
}
