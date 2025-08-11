import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Public } from 'src/core/decorators/public.decorator';
import { CreateEquipoDto } from '../../application/dtos/create-equipo.dto';
import { UpdateEquipoDto } from '../../application/dtos/update-equipo.dto';
import { EquipoService } from '../../equipo.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';


@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('REPRESENTANTE')
  @Post()
  async create(@Body() dto: CreateEquipoDto) {
    return this.equipoService.create(dto);
  }

  @Roles('REPRESENTANTE')
  @Get()
  findAll() {
    return this.equipoService.findAll();
  }

  @Public()
  @Roles('REPRESENTANTE')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEquipoDto) {
    return this.equipoService.update(id, dto);
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.equipoService.delete(id);
  }
}


