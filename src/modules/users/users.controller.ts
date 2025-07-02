import { Controller, Patch, Body, Param, UseGuards, Request, UnauthorizedException, Put, Get, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
// Este me hace meter llaves de autorizacion
import { UpdateUserDto } from './dto/updateUser.dto';
import { Public } from 'src/core/decorators/public.decorators';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Public()
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }


  @Public()
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Request() req,
  ) {
    // Opcional: valida que solo el usuario pueda eliminar su propio perfil
    // if (req.user.userId !== id) {
    //   throw new UnauthorizedException('No puedes eliminar otro usuario');
    // }

    return this.usersService.deleteUser(id);
  }
}

