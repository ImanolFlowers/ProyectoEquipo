import { Controller, Patch, Body, Param, UseGuards, Request, UnauthorizedException, Put, Get, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/core/decorators/public.decorators';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  

  @Public()
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }


  // agregar el put y delete 
  // tambien importarlo ul update dto



}

