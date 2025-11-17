export class Partido {
  constructor(
    public id: string,
    public fechaHora: Date,
    public lugar: string,
    public estado: EstadoPartido,
    public jornada: number,
    public temporadaId: string,
    public equipoAId: string,
    public equipoAnombre?: string | null,
    public equipoBId?: string,
    public equipoBnombre?: string | null,
    public golesEquipoA: number = 0,
    public golesEquipoB: number = 0,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

export enum EstadoPartido {
  FUTURO = 'FUTURO',
  EN_JUEGO = 'EN_JUEGO',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
}
