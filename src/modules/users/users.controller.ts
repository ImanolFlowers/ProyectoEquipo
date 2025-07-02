import { Controller, Patch, Body, Param, UseGuards, Request, UnauthorizedException, Put, Get, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/core/decorators/public.decorators';
import { UpdateUserDto } from './dto/updateUser.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  

  @Public()
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }


  @Public()
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  //Agregar Delete


}

