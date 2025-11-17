import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateTemporadaDto } from '../../application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from '../../application/dtos/update-temporada.dto';
import { CreateTemporadaUseCase } from '../../application/use-cases/create-temporada.use-case';

import { UpdateTemporadaUseCase } from '../../application/use-cases/update-temporada.use-case';


import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { DeleteTemporadaUseCase } from '../../application/use-cases/delete-temporada.use-case';
import { GetTemporadasUseCase } from '../../application/use-cases/get-temporadas.use-case';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { temporadaPost } from '../../domain/entities/temporadas-entity';
import { FinalizarTemporadaUseCase } from '../../application/use-cases/finalizar-temporada.use-case';


@ApiBearerAuth()
@ApiTags('Temporadas')
@Controller('temporadas')
export class TemporadasController {
constructor(
    private readonly createUC: CreateTemporadaUseCase,
    private readonly getUC:    GetTemporadasUseCase,
    private readonly updateUC: UpdateTemporadaUseCase,
    private readonly deleteUC: DeleteTemporadaUseCase,
    private readonly finalizarUC: FinalizarTemporadaUseCase,
) {}


//   en este caso el controler es manejado por el arbitro, quien crea las temporadas o hace peticiones
//   usando el token para que no haya problemas y otro usuario que no sea admin pueda modificar temporadas
    @ApiOperation({summary: "Creación de temporadas"})
    @ApiOkResponse({type: temporadaPost})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARBITRO')
    @Post()
    async create(@Body() dto: CreateTemporadaDto) {
        return this.createUC.execute(dto);
    }

    
    
    @ApiOperation({summary: "Lista de temporadas"})
    @Roles('ARBITRO')
    @Get()
    async findAll() {
        return this.getUC.execute();
    }


    @ApiOperation({summary: "Modificacion de nombres de temporadas"})
    @ApiOkResponse({type: temporadaPost})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARBITRO')
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateTemporadaDto) {
        return this.updateUC.execute(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARBITRO')
    @Put('finalizar/:id')
    async finalizar(@Param('id') id: string) {
        return this.finalizarUC.execute(id);
    }


    @ApiOperation({summary: "Eliminación de Temporadas"})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ARBITRO')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.deleteUC.execute(id);
    }
}