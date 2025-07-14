export class Equipo {
  id: string;
  nombre: string;
  escudo?: string | null;
  localidad?: string | null;
  entrenadorId: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}