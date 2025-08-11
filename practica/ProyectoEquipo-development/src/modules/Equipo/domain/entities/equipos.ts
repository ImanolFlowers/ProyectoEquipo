export class Equipo {
  representanteId: string;
  constructor(
    public id: string,
    public nombre: string,
    public activa: boolean,
    public readonly createdAt: Date,
    public escudo?: string,
    public location?: string,
    public representante?: string
  ) {}

  setId(id: string) {
    this.id = id;
  }
}
