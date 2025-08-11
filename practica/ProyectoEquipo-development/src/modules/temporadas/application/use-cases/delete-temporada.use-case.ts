import { Inject, Injectable } from '@nestjs/common';
import { TemporadasRepository } from '../../infraestructure/repositories/prisma-temporadas.repository';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';


@Injectable()
export class DeleteTemporadaUseCase {
  constructor(
    private readonly repo: ITemporadasRepository,
  ) {}


  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}