import { Controller, Get } from '@nestjs/common';
import { ListarTablaUseCase } from '../../application/use-cases/listarTablaGeneral.usecase';
import { Public } from 'src/core/decorators/public.decorator';



@Controller('tabla') 
export class TablaPosicionesController  {
    constructor(private readonly listarTablaUseCase: ListarTablaUseCase) {}

    @Public()
    @Get()
    async excecute() {
        return this.listarTablaUseCase.execute()
    }
}
