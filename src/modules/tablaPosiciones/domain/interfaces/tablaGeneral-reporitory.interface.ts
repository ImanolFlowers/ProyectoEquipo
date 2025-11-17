import { TablaGeneral } from '../entities/tablaGeneral.entity';

export interface ITablaGeneralRepository {
    listarTabla(): Promise<TablaGeneral[]>;
}
