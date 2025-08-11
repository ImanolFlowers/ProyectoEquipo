import { CreateTemporadaDto } from '../../application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';
import { Temporada } from '../entities/temporada.entity';


export abstract class ITemporadasRepository {
  abstract create(dto: CreateTemporadaDto): Promise<Temporada>;
  abstract findAll(): Promise<Temporada[]>;
  abstract update(id: string, dto: UpdateTemporadaDto): Promise<Temporada>;
  abstract delete(id: string): Promise<void>;
}
