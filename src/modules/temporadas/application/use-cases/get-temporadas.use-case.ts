import {  Injectable } from '@nestjs/common';
import { ITemporadasRepository } from '../../domain/interfaces/temporada-repository.interface';




@Injectable()
export class GetTemporadasUseCase {
  constructor(private readonly repo: ITemporadasRepository) {}
  async execute() { return this.repo.findAll(); }
}


