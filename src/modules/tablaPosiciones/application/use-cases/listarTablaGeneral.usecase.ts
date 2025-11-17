import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { TablaGeneral } from '../../domain/entities/tablaGeneral.entity';

@Injectable()
export class ListarTablaUseCase {
    constructor(private readonly prisma: PrismaService) {}

    async execute(): Promise<TablaGeneral[]> {
        // mi optencion de datos
        const equipos = await this.prisma.equipo.findMany({
        where: { active: true },
        select: { id: true, nombre: true },
        });

        // los datos de los partidos finalizados
        const partidos = await this.prisma.partido.findMany({
        where: { estado: 'FINALIZADO' },
        select: {
            equipoAId: true,
            equipoBId: true,
            golesEquipoA: true,
            golesEquipoB: true,
        },
        });

        // inicializacion de tabla
        const tabla: TablaGeneral[] = equipos.map(equipo => new TablaGeneral(
        equipo.id,
        equipo.nombre,
        0,   // posición se calculara despues
        0,   // Partidos Jugados
        0,   // Partidos Ganados
        0,   // Partidos Empatados
        0,   // Partidos Perdidos
        0,   // Goles a Favor
        0,   // Goles en Contra
        0,   // DIF
        0    // Puntos
        ));

        // actualizacion de estadisticas
        for (const partido of partidos) {
        const equipoA = tabla.find(t => t.equipoId === partido.equipoAId);
        const equipoB = tabla.find(t => t.equipoId === partido.equipoBId);

        if (!equipoA || !equipoB) continue;

        // estos son los partidos jugados
        equipoA.PJ++;
        equipoB.PJ++;

        // los goles de quien obtiene
        equipoA.GF += partido.golesEquipoA;
        equipoA.GC += partido.golesEquipoB;

        equipoB.GF += partido.golesEquipoB;
        equipoB.GC += partido.golesEquipoA;

        // el de los resultados que me da de los empatados, perdidos y ganados
        // es como registra 
        if (partido.golesEquipoA > partido.golesEquipoB) {
            equipoA.PG++;
            equipoB.PP++;
        } else if (partido.golesEquipoA < partido.golesEquipoB) {
            equipoB.PG++;
            equipoA.PP++;
        } else {
            equipoA.PE++;
            equipoB.PE++;
        }
        }

        // el calculo de la diferencia de goles y los puntos
        tabla.forEach(t => {
        t.DIF = t.GF - t.GC;
        t.Pts = t.PG * 3 + t.PE;
        });

        // orden de la tabla con respecto a los puntos y gokes
        tabla.sort((a, b) => {
        if (b.Pts !== a.Pts) return b.Pts - a.Pts;
        if (b.DIF !== a.DIF) return b.DIF - a.DIF;
        return b.GF - a.GF;
        });

        // las posiciones finales, eee
        tabla.forEach((t, i) => t.posicion = i + 1);

        return tabla;
    }
}
