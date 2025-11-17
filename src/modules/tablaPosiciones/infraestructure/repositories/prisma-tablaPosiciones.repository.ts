import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { TablaGeneral } from '../../domain/entities/tablaGeneral.entity';

@Injectable()
export class TablaGeneralRepository {
    constructor(private readonly prisma: PrismaService) {}

    async listarTabla(): Promise<TablaGeneral[]> {
        const equipos = await this.prisma.equipo.findMany({
        include: {
            partidosA: true,
            partidosB: true,
        },
        });

        const tabla: TablaGeneral[] = equipos.map((equipo) => {
        let PJ = 0, PG = 0, PE = 0, PP = 0, GF = 0, GC = 0;

        // partidos locales
        equipo.partidosA.forEach((p) => {
            if (p.estado !== 'FINALIZADO') return;
            PJ++;
            GF += p.golesEquipoA;
            GC += p.golesEquipoB;

            if (p.golesEquipoA > p.golesEquipoB) PG++;
            else if (p.golesEquipoA === p.golesEquipoB) PE++;
            else PP++;
        });

        // el de los partidos como visitante
        equipo.partidosB.forEach((p) => {
            if (p.estado !== 'FINALIZADO') return;
            PJ++;
            GF += p.golesEquipoB;
            GC += p.golesEquipoA;

            if (p.golesEquipoB > p.golesEquipoA) PG++;
            else if (p.golesEquipoB === p.golesEquipoA) PE++;
            else PP++;
        });

        const DIF = GF - GC;
        const Pts = PG * 3 + PE;
        // en esta parte se calula la posicion de numero si se quiere ordenar por posicion
        // asi sube primero
        return new TablaGeneral(
            equipo.id,
            equipo.nombre,
            0, 
            PJ,
            PG,
            PE,
            PP,
            GF,
            GC,
            DIF,
            Pts,
        );
        });

        // ordenacion por puntos y diferencia de goles
        tabla.sort((a, b) => {
        if (b.Pts !== a.Pts) return b.Pts - a.Pts;
        if (b.DIF !== a.DIF) return b.DIF - a.DIF;
        return b.GF - a.GF;
        });

        // posiciones
        tabla.forEach((t, i) => (t.posicion = i + 1));

        return tabla;
    }
}
