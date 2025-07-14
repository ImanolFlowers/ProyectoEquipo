export class EquipoConEntrenadorDto {
  id: string;
  nombre: string;
  escudo?: string | null;
  localidad?: string | null;
  entrenadorNombreCompleto: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}
