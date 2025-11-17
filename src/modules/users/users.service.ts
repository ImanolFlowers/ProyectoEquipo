import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '../../../generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from '../../core/databases/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // me obtiene todos los usuarios
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
        role: true,
      },
    });
  }

  // solamente crea 1 arbitro, creo estara de cajon los datos (se checara)
  async createUser(userData: CreateUserDto) {
  const errors: string[] = [];

  // si el rol es ARBITRO, este valida que no exista otro
  if (userData.role === 'ARBITRO') {
    const existingArbitro = await this.prismaService.user.findFirst({
      where: { role: 'ARBITRO' },
    });
    if (existingArbitro) {
      errors.push('Ya existe un árbitro registrado en el sistema');
    }
  }

  // validar username
  const existingUsername = await this.prismaService.user.findUnique({
    where: { username: userData.username },
  });
  if (existingUsername) {
    errors.push('El nombre de usuario ya existe, elige otro');
  }

  // validar email
  const existingEmail = await this.prismaService.user.findUnique({
    where: { email: userData.email },
  });
  if (existingEmail) {
    errors.push('El correo electrónico ya está en uso');
  }

  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }

  // crea ek usuario
  const hash = await bcrypt.hash(userData.password, 12);

  const user = await this.prismaService.user.create({
    data: {
      ...userData,
      password: hash,
    },
  });

  const { id, name, apellido, email, username, telefono, image, role } = user;
  return { id, name, apellido, email, username, telefono, image, role };
}


  // actualiza el usuario usuario
  async updateUser(userId: string, updateData: UpdateUserDto) {
    if ('role' in updateData) {
      delete updateData.role; // no se permite cambiar rol
    }

    if (updateData.username) {
      const existingUser = await this.prismaService.user.findUnique({
        where: { username: updateData.username },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new BadRequestException('El nombre de usuario ya está en uso');
      }
    }

    if (updateData.email) {
      const existingEmail = await this.prismaService.user.findUnique({
        where: { email: updateData.email },
      });

      if (existingEmail && existingEmail.id !== userId) {
        throw new BadRequestException('El correo electrónico ya está en uso');
      }
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    try {
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          updateAt: new Date(),
        },
      });

      return 'Se actualizó correctamente el usuario';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('No se encontró el usuario para actualizar');
      }
      throw error;
    }
  }

  // busca los usuariospor su nombre o username (lo mismo, registrado diferente)
  async findByUserName(username: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  // elimina el usuario pero solo si es el unico y en este caso tomo el de arbitro
  // falta checar ESTO
  async deleteUser(id: string) {
    const totalUsers = await this.prismaService.user.count();

    if (totalUsers <= 1) {
      throw new BadRequestException('No puedes eliminar la única cuenta de árbitro');
    }

    await this.prismaService.equipo.deleteMany({
      where: { entrenadorId: id },
    });

    await this.prismaService.user.delete({
      where: { id },
    });

    return 'Eliminación exitosa del usuario';
  }

  // ELIMINAR CON CONTRASELA  
  async deleteUserWithPassword(userId: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const totalUsers = await this.prismaService.user.count();
    if (totalUsers <= 1) {
      throw new BadRequestException('No puedes eliminar la única cuenta de árbitro');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    await this.prismaService.equipo.deleteMany({
      where: { entrenadorId: userId },
    });

    await this.prismaService.user.delete({
      where: { id: userId },
    });

    return 'Tu cuenta y equipos han sido eliminados correctamente';
  }
}
