import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
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
        role: true,
      },
    });
  }



async createUser(userData: CreateUserDto) {
  const existingUsername = await this.prismaService.user.findUnique({
    where: { username: userData.username },
  });

  if (existingUsername) {
    throw new BadRequestException('El nombre de usuario ya está en uso');
  }

  const existingEmail = await this.prismaService.user.findUnique({
    where: { email: userData.email },
  });

  if (existingEmail) {
    throw new BadRequestException('El correo electrónico ya está en uso');
  }

  const hash = await bcrypt.hash(userData.password, 12);

  const user = await this.prismaService.user.create({
    data: {
      ...userData,
      password: hash,
      role: userData.role,
    },
  });

  const { id, name, apellido, email, username, telefono, image, role } = user;
  return { id, name, apellido, email, username, telefono, image, role };
}





async updateUser(userId: string, updateData: UpdateUserDto) {

  if ('role' in updateData) {
    delete updateData.role;
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

  // Si viene contraseña, cifrarla
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

    return 'Se actualizó correctamente';
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



  async findByUserName(username: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async deleteUser(id: string) {
    await this.prismaService.user.delete({
      where: { id },
    });

    return 'Eliminación exitosa';
  }
}
