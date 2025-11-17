import { Injectable } from '@nestjs/common';
import { EquipoRepository } from 'src/modules/equipos/domain/interfaces/equipos-repository.interface';
import { PartidoRepository } from 'src/modules/partidos/domain/interfaces/partidos-repository.interface';


@Injectable()
export class ObtenerTablaGeneralUseCase {
    constructor(
        private readonly equipoRepo: EquipoRepository,
        private readonly partidoRepo: PartidoRepository,
    ) {}

    async execute() {
        const equipos = await this.equipoRepo.findAll();
        const partidos = await this.partidoRepo.findAll();

        const tabla = equipos.map((equipo) => {
        // calculo de goles
        let golesAFavor = 0;
        let golesEnContra = 0;

        for (const partido of partidos) {
            if (partido.equipoAId === equipo.id) {
            golesAFavor += partido.golesEquipoA ?? 0;
            golesEnContra += partido.golesEquipoB ?? 0;
            } else if (partido.equipoBId === equipo.id) {
            golesAFavor += partido.golesEquipoB ?? 0;
            golesEnContra += partido.golesEquipoA ?? 0;
            }
        }

        return {
            equipoId: equipo.id,
            nombreEquipo: equipo.nombre,
            posicion: 1, 
            golesAFavor,
            golesEnContra,
        };
        });

        return tabla;
    }
}
