export class Temporada {
  constructor(
    public readonly id: string,
    public nombre: string,
    public activa: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
  ) {}

  finalizar() {
    this.activa = false;
  }

  value() {
    return {
      id: this.id,
      nombre: this.nombre,
      activa: this.activa,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
