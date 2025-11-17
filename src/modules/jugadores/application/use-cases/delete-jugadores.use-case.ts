import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JugadorRepository } from '../../domain/interfaces/jugadores-repository.interface';

@Injectable()
export class DeleteJugadorUseCase {
  constructor(
    @Inject('JUGADOR_REPOSITORY')
    private readonly jugadorRepository: JugadorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // validacion de si existe ed para eliminar
    try {
      await this.jugadorRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(`Jugador con id ${id} no encontrado`);
    }
  }
}
