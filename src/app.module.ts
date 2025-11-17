import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TemporadasModule } from './modules/temporadas/temporadas.module';
import { EquiposModule } from './modules/equipos/equipos.module';
import { JugadoresModule } from './modules/jugadores/jugadores.module';
import { PartidosModule } from './modules/partidos/partidos.module';
import { TablaPosicionesModule } from './modules/tablaPosiciones/tabla-posiciones.module';




// Acordarse que cada que implementamos nuevos modulos, colocar el nombre del modulo
//y en los demas modulos separados, colocar los coasos de uso, por eso es que no agarra
@Module({
  imports: [AuthModule, UsersModule, TemporadasModule, EquiposModule, JugadoresModule, PartidosModule, TablaPosicionesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
