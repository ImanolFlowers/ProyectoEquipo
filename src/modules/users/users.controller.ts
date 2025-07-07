import { Controller, Patch, Body, Param, UseGuards, Request, UnauthorizedException, Put, Get, Delete, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { Role } from 'generated/prisma';


@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Put(':id')
  @Roles('ARBITRO', 'ENTRENADOR')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    // Solo permite que el usuario modifique su perfil, excepto árbitro que puede modificar cualquiera
    // de momento el arbitro puede modificar
    //componer despues
    if (req.user.userId !== id && req.user.role !== 'ARBITRO') {
      throw new UnauthorizedException('No puedes modificar otro usuario');
    }

    if ('role' in updateUserDto) {
    throw new UnauthorizedException('No está permitido cambiar el rol del usuario');
  }

    return this.usersService.updateUser(id, updateUserDto);
  }

 @UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':id')
async deleteUser(
  @Param('id') id: string,
  @Request() req,
) {
  const usuarioActual = req.user;

  // Si es árbitro, puede eliminar a cualquiera
  if (usuarioActual.role === Role.ARBITRO) {
    return this.usersService.deleteUser(id);
  }

  // Si no es árbitro, solo puede eliminar su propia cuenta
  if (usuarioActual.userId !== id) {
    throw new ForbiddenException('No tienes permiso para eliminar a otros usuarios');
  }

  return this.usersService.deleteUser(id);
}
}
