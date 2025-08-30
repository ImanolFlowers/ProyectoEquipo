import { Body, Controller, Post } from '@nestjs/common';
import { EnfrentamientosService } from './partidos.service';


@Controller('enfrentamientos')
export class EnfrentamientosController {
  constructor(private readonly enfrentamientosService: EnfrentamientosService) {}

  @Post()
  crear(@Body() data: any) {
    return this.enfrentamientosService.crear(data);
  }
}
