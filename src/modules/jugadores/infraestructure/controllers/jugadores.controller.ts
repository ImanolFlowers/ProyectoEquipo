import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus, Get, Param, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../../core/decorators/roles.decorator'; 
import { CreateJugadorUseCase } from '../../application/use-cases/create-jugadores.use-case';
import { GetJugadoresUseCase } from '../../application/use-cases/get-jugadores.use-case';
import { DeleteJugadorUseCase } from '../../application/use-cases/delete-jugadores.use-case';
import { UpdateJugadorUseCase } from '../../application/use-cases/update-jugadores.use-case';
import { CreateJugadorDto } from '../../application/dtos/create-jugadores.dto';
import { UpdateJugadorDto } from '../../application/dtos/update-jugadores.dto';
import { Public } from 'src/core/decorators/public.decorator';

@ApiTags('Jugadores')
@Controller('equipos/jugadores')
export class JugadoresController {
  constructor(
    private readonly createUC: CreateJugadorUseCase,
    private readonly getJugadoresUC: GetJugadoresUseCase, 
    private readonly deleteUC: DeleteJugadorUseCase,
    private readonly updateUC: UpdateJugadorUseCase, 
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR')
  async create(@Body() dto: CreateJugadorDto, @Request() req) {
    return this.createUC.execute(dto, req.user.userId, req.user.role);
  }
  @Public()
  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('ENTRENADOR', 'ARBITRO')
  async getAll() {
    return this.getJugadoresUC.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async getOne(@Param('id') id: string) {
    return this.getJugadoresUC.getById(id);
  }

  // este visualiza los jugadores que contiene el equipo por medio de la id
  @Get('equipo/:equipoId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async getByEquipo(@Param('equipoId') equipoId: string) {
    return this.getJugadoresUC.getByEquipo(equipoId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async delete(@Param('id') id: string) {
    await this.deleteUC.execute(id);
    return { message: `Jugador ${id} eliminado correctamente` };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async update(@Param('id') id: string, @Body() dto: UpdateJugadorDto, @Request() req) {
    return this.updateUC.execute(id, dto, req.user.userId, req.user.role);
  }
}

// railwa