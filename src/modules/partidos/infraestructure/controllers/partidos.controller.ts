import { Controller, Get, Post, Patch, Param, Body, UseGuards, Put, Delete } from '@nestjs/common';
import { CreatePartidoDto } from '../../application/dtos/create-partido.dto';
import { UpdatePartidoDto } from '../../application/dtos/update-partido.dto';
import { CreatePartidoUseCase } from '../../application/use-cases/create-partido.usecase';
import { UpdatePartidoUseCase } from '../../application/use-cases/update-partidos.use-case';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { GetPartidosUseCase } from '../../application/use-cases/get-partidos.usecase';
import { DeletePartidoUseCase } from '../../application/use-cases/delete-partido.usecase';
import { Public } from '../../../.././core/decorators/public.decorator';


@Controller('partidos')
export class PartidosController {
  constructor(
    private readonly createPartido: CreatePartidoUseCase,
    private readonly updatePartido: UpdatePartidoUseCase,
    private readonly getPartidos: GetPartidosUseCase,
    private readonly deletePartido: DeletePartidoUseCase
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  // @Public()
  create(@Body() dto: CreatePartidoDto) {
    return this.createPartido.execute(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.getPartidos.findAll();
  }
  @Public()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getPartidos.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  update(@Param('id') id: string, @Body() dto: UpdatePartidoDto) {
    return this.updatePartido.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ENTRENADOR', 'ARBITRO')
  delete(@Param('id') id: string) {
    return this.deletePartido.execute(id);
  }
}

