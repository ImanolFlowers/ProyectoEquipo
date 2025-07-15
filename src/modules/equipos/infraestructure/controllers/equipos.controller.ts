import {Controller, Post, Body, UseGuards, Request, Get, Put, Param, Delete} from '@nestjs/common';
import { CreateEquipoUseCase } from '../../application/use-cases/create-equipos.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { CreateEquipoDto } from '../../application/dtos/create-equipos.dto';
import { GetEquiposUseCase } from '../../application/use-cases/get-equipos.use-case';
import { UpdateEquipoUseCase } from '../../application/use-cases/update-equipos.use-case';
import { DeleteEquipoUseCase } from '../../application/use-cases/delete-equipos.use-case';
import { UpdateEquipoDto } from '../../application/dtos/update-equipos.dto';

@Controller('equipos')
export class EquiposController {
  constructor(
    private readonly createUC: CreateEquipoUseCase,
    private readonly getUC: GetEquiposUseCase,
    private readonly updateUC: UpdateEquipoUseCase,
    private readonly deleteUC: DeleteEquipoUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('ENTRENADOR')
  async create(@Body() dto: CreateEquipoDto, @Request() req) {
    return this.createUC.execute(dto, req.user.userId, req.user.role);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ARBITRO', 'ENTRENADOR')
  async getAll(@Request() req) {
    if (req.user.role === 'ARBITRO') return this.getUC.getAllEquipos();
    return this.getUC.execute(req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async update(@Param('id') id: string, @Body() dto: UpdateEquipoDto, @Request() req) {
    if (req.user.role === 'ARBITRO') return this.updateUC.executeAsArbitro(id, dto);
    return this.updateUC.execute(id, dto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async delete(@Param('id') id: string, @Request() req) {
    if (req.user.role === 'ARBITRO') return this.deleteUC.executeAsArbitro(id);
    return this.deleteUC.execute(id, req.user.userId);
  }
}
