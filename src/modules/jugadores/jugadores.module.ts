import { Module } from '@nestjs/common';
import { JugadoresController } from './infraestructure/controllers/jugadores.controller';
import { CreateJugadorUseCase } from './application/use-cases/create-jugadores.use-case';
import { JugadorPrismaRepository } from './infraestructure/repositories/prisma-jugadores.repository';
import { EquiposModule } from '../equipos/equipos.module';
import { PrismaService } from 'src/core/databases/prisma.service';
import { GetJugadoresUseCase } from './application/use-cases/get-jugadores.use-case';
import { DeleteJugadorUseCase } from './application/use-cases/delete-jugadores.use-case';
import { UpdateJugadorUseCase } from './application/use-cases/update-jugadores.use-case';


@Module({
  // EquiposModule exporta el EQUIPO_REPOSITORY que tengo en carpetas equipos
  imports: [EquiposModule], 
  controllers: [JugadoresController],
  providers: [
    //inyeccion
    PrismaService,
    {
      provide: 'JUGADOR_REPOSITORY',
      useClass: JugadorPrismaRepository,
    },
    CreateJugadorUseCase,
    GetJugadoresUseCase, 
    DeleteJugadorUseCase,
    UpdateJugadorUseCase
  ],
  exports: ['JUGADOR_REPOSITORY', CreateJugadorUseCase],
})
export class JugadoresModule {}
