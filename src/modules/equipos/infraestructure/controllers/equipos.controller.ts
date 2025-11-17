import {Controller, Post, Body, UseGuards, Request, Get, Put, Param, Delete, HttpCode, HttpStatus} from '@nestjs/common';
import { CreateEquipoUseCase } from '../../application/use-cases/create-equipos.use-case';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { CreateEquipoDto } from '../../application/dtos/create-equipos.dto';
import { GetEquiposUseCase } from '../../application/use-cases/get-equipos.use-case';
import { UpdateEquipoUseCase } from '../../application/use-cases/update-equipos.use-case';
import { DeleteEquipoUseCase } from '../../application/use-cases/delete-equipos.use-case';
import { UpdateEquipoDto } from '../../application/dtos/update-equipos.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Equipo } from '../../domain/entities/equipos.entity';
import { Public } from 'src/core/decorators/public.decorator';


@ApiBearerAuth()
@ApiTags('Equipos')
@Controller('equipos')
export class EquiposController {
  constructor(
    private readonly createUC: CreateEquipoUseCase,
    private readonly getUC: GetEquiposUseCase,
    private readonly updateUC: UpdateEquipoUseCase,
    private readonly deleteUC: DeleteEquipoUseCase,
  ) {}

  // agregar
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: "Agregar un equipo"})
  @ApiCreatedResponse({type: Equipo})
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('ENTRENADOR')
  async create(@Body() dto: CreateEquipoDto, @Request() req) {
    return this.createUC.execute(dto, req.user.userId, req.user.role);
  }

  // Visualizar
  // EN ESTE CASO SOLO MODIFIQUE LA VISUALIZACION PARA QUE SEA EN PUBLICO 
  // ASI NO TENGO QUE PEDIR LA AUTENTICACION 
  @Public()
  @ApiOperation({summary: "Lista de equipos"})
  @ApiOkResponse({type: Equipo})
  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('ARBITRO', 'ENTRENADOR')
  async getAll(){
    return this.getUC.getAllEquipos();
  }
  // async getAll(@Request() req) {
  //   if (req.user.role === 'ARBITRO') return this.getUC.getAllEquipos();
  //   return this.getUC.execute(req.user.userId);
  // }

  //Actualizar
  @ApiOperation({summary: "Modificación de equipos"})
  @ApiOkResponse({type: Equipo})
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async update(@Param('id') id: string, @Body() dto: UpdateEquipoDto, @Request() req) {
    if (req.user.role === 'ARBITRO') return this.updateUC.executeAsArbitro(id, dto);
    return this.updateUC.execute(id, dto, req.user.userId);
  }

  //ELIMINAR EL EQUIPO
  @ApiOperation({summary: "Eliminación de equipos"})
  @ApiOkResponse({type: Equipo})
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  async delete(@Param('id') id: string, @Request() req) {
    if (req.user.role === 'ARBITRO') return this.deleteUC.executeAsArbitro(id);
    return this.deleteUC.execute(id, req.user.userId);
  }
}
