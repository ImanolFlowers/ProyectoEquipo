import { CreateTemporadaDto } from '../../application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';
import { Temporada } from '../entities/temporada.entity';

export abstract class ITemporadasRepository {
  // creacion de temporada
  abstract create(dto: CreateTemporadaDto): Promise<Temporada>;

  // traer las temporadas creadas
  abstract findAll(): Promise<Temporada[]>;

  // traer solo latemporada por su id
  abstract findById(id: string): Promise<Temporada | null>;

  // Actualizacion de temporada ya sea su nombre o estado
  abstract update(id: string, dto: UpdateTemporadaDto): Promise<Temporada>;

  // eliminacion de temporada
  abstract delete(id: string): Promise<void>;
}
