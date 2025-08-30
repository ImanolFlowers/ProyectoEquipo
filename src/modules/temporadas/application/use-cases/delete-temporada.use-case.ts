import { Inject, Injectable } from '@nestjs/common';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';

@Injectable()
export class DeleteTemporadaUseCase {
  constructor(
    @Inject(ITemporadasRepository)
    private readonly repo: ITemporadasRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}