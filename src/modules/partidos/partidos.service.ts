import { Injectable } from '@nestjs/common';

interface CrearEnfrentamientoDto {
  equipoLocalId: number;
  equipoVisitanteId: number;
  lugar: string;
  fecha: string;
  hora: string;
}

@Injectable()
export class EnfrentamientosService {
  private enfrentamientos: any[] = [];

  crear(data: CrearEnfrentamientoDto) {
    if (!data.equipoLocalId || !data.equipoVisitanteId) {
      throw new Error('Se requieren los IDs de los equipos');
    }
    if (data.equipoLocalId === data.equipoVisitanteId) {
      throw new Error('Un equipo no puede enfrentarse a sí mismo');
    }

    //eNFRENTAMIENTOS PARA AGREFGAR
    const nuevo = {
      id: this.enfrentamientos.length + 1,
      equipoLocal: { id: data.equipoLocalId, nombre: `Equipo ${data.equipoLocalId}` },
      equipoVisitante: { id: data.equipoVisitanteId, nombre: `Equipo: ${data.equipoVisitanteId}` },
      lugar: data.lugar,
      fecha: data.fecha,
      hora: data.hora,
    };
    this.enfrentamientos.push(nuevo);

    return nuevo;
  }
  //GET
  obtenerTodos() {
    return this.enfrentamientos;
  }
}
