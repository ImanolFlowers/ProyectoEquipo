import { Injectable, Inject } from '@nestjs/common';
import { EquipoRepository } from '../../domain/interfaces/equipos-repository.interface';
import { EQUIPO_REPOSITORY } from '../../domain/constants';
import { EquipoConEntrenadorDto } from '../dtos/equipo-con-entrenador.dto';


@Injectable()
export class GetEquiposUseCase {
  constructor(
    @Inject(EQUIPO_REPOSITORY)
    private readonly equipoRepository: EquipoRepository,
  ) {}


  async execute(entrenadorId: string) {
    return this.equipoRepository.findAllByEntrenador(entrenadorId);
  }


  async getAllEquipos(): Promise<EquipoConEntrenadorDto[]> {
    return this.equipoRepository.findAll();
  }
}
