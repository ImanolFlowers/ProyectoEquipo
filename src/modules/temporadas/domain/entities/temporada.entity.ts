import { EstadoTemporada } from '../../../../../generated/prisma';

export class Temporada {
  constructor(
    public readonly id: string,
    public estado: EstadoTemporada,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
  ) {}

  finalizar() {
    this.estado = EstadoTemporada.FINALIZADA;
  }

  value() {
    return {
      id: this.id,
      estado: this.estado,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
