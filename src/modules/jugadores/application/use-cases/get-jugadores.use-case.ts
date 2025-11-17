import { Injectable, Inject } from '@nestjs/common';
import { JugadorRepository } from '../../domain/interfaces/jugadores-repository.interface';

@Injectable()
export class GetJugadoresUseCase {
  constructor(
    @Inject('JUGADOR_REPOSITORY') private readonly jugadorRepo: JugadorRepository,
  ) {}

  async execute() {
    // devuelve todos los jugadores
    return this.jugadorRepo.findAll();
  }

  async getById(id: string) {
    // devuelve un jugador por medio de id
    return this.jugadorRepo.findById(id);
  }

  async getByEquipo(equipoId: string) {
    // devuelve los jugadores de un equipo especifico por su id
    return this.jugadorRepo.findAllByEquipo(equipoId);
  }
}
