import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TemporadasModule } from './modules/temporadas/temporadas.module';




// Actualizacion
@Module({
  imports: [AuthModule, UsersModule, TemporadasModule],
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
