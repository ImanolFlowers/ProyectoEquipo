import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import {CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/core/databases/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

        async findAll() {
  return this.prismaService.user.findMany({
    select: {
      id: true,
      name: true,
      apellido: true,
      username: true,
      email: true,
      image: true,
      telefono: true,
      active: true,
      createAt: true,
      updateAt: true,
    },
  });
}
        
    async createUser(userData: CreateUserDto){
        const hash = await bcrypt.hash(userData.password, 12)

        const user= await this.prismaService.user.create({
            data: {
                ...userData,
                password: hash,
            
            }
        });

        const {id, name, apellido, email, username, telefono, image} = user
        return {id, name, apellido, email, username, telefono, image}

    }

    async findByUserName(username: string): Promise<User | null>{
        return this.prismaService.user.findUnique({
            where:{
                username: username,
            }
        });
    }

    // falta agregar update y delete
    // importar el update dto

  

}
