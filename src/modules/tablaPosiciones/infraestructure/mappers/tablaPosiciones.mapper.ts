import { TablaGeneral } from '../../domain/entities/tablaGeneral.entity';

export class TablaGeneralMapper {
  static toDomain(data: {
    id: string;
    nombre: string;
    PJ: number;
    PG: number;
    PE: number;
    PP: number;
    GF: number;
    GC: number;
    DIF: number;
    Pts: number;
    posicion: number;
  }): TablaGeneral {
    return new TablaGeneral(
      data.id,
      data.nombre,
      data.posicion,
      data.PJ,
      data.PG,
      data.PE,
      data.PP,
      data.GF,
      data.GC,
      data.DIF,
      data.Pts,
    );
  }
}
