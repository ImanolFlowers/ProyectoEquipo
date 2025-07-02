import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import {CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from 'src/core/databases/prisma.service';

@Injectable()
export class UsersService {
    //constructor que reciba instancia de PrismaService
    constructor(private prismaService: PrismaService) {}
        



        // ACTUALIZADO

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
        
    // se agrega
    //metodo para registrar usuario y buscar usuario

    async createUser(userData: CreateUserDto){
        //  ifrar la contraseña 
        const hash = await bcrypt.hash(userData.password, 12)

        const user= await this.prismaService.user.create({
            data: {
                ...userData,
                password: hash,
            
            }
        });

        // devolver lo datos basicos del usuario
        const {id, name, apellido, email, username, telefono, image} = user
        //retornamos el registro del usuario 
        return {id, name, apellido, email, username, telefono, image}

    }


    // Actualizar el usuario
    async updateUser(userId: string, updateData: UpdateUserDto) {
      // Si actualizas la contraseña, deberías hashearla aquí:
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
      }

      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          updateAt: new Date(),
        },
      });
      return'Se actualizo correctamente' ;
}


    async findByUserName(username: string): Promise<User | null>{
        //buscar un registro donde el username sea el valor 
        //recibido eb el parametro username
        return this.prismaService.user.findUnique({
            where:{
                username: username,
            }
        });
    }

    

  async deleteUser(id: string) {
  await this.prismaService.user.delete({
    where: { id },
  });

  return "Eliminación exitosa";
}



}
