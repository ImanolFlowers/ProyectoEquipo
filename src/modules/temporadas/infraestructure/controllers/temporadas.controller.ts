import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TemporadasService } from '../../temporadas.service';
import { CreateTemporadaDto } from '../../application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';
import { CreateTemporadaUseCase } from '../../application/use-cases/create-temporada.use-case';
import { GetTemporadasUseCase } from '../../application/use-cases/get-temporadas.use-case';
import { UpdateTemporadaUseCase } from '../../application/use-cases/update-temporada.use-case';
import { DeleteTemporadaUseCase } from '../../application/use-cases/delete-temporada.use-case';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';



@Controller('temporadas')
export class TemporadasController {
  constructor(
    private readonly createUC: CreateTemporadaUseCase,
    private readonly getUC:    GetTemporadasUseCase,
    private readonly updateUC: UpdateTemporadaUseCase,
    private readonly deleteUC: DeleteTemporadaUseCase,
  ) {}
  

//   en este caso el controler es manejado por el arbitro, quien crea las temporadas o hace peticiones
//   usando el token para que no haya problemas y otro usuario que no sea admin pueda modificar temporadas
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARBITRO')
    @Post()
    async create(@Body() dto: CreateTemporadaDto) {
        return this.createUC.execute(dto);
    }
    
    @Roles('ARBITRO')
    @Get()
    async findAll() {
        return this.getUC.execute();


    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARBITRO')
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateTemporadaDto) {
        return this.updateUC.execute(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARBITRO')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.deleteUC.execute(id);
    }
}