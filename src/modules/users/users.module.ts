import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/core/databases/prisma.service';

@Module({
  //imprtacion del modulo prisma que permite buscar usuarios
  providers: [PrismaService, UsersService],
  exports: [UsersService],
  controllers: [UsersController], // lo exportamos para usarlo con otrso modulos
})
export class UsersModule {}
