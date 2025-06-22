import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    //imprtacion del modulo prisma que permite buscar usuarios
  providers: [PrismaService, UsersService],
  exports: [UsersService], // lo exportamos para usarlo con otrso modulos
})
export class UsersModule {}
