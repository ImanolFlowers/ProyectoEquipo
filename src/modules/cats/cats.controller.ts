import { Body, Controller, Delete, Get, Param, ParseFilePipe, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './types/cat.type';
import { CreateCatDto } from './dtos/create-cat.dto';
import { UpdateCatDto } from './dtos/updade-cat.dto';



@Controller('cats') //recurso /cats
export class CatsController {
    //(private readonly catsService: CatsService)
    //significa que es un atributo privado inicializando
    //con una instancia de CatsSrvice
    constructor(private readonly catsService: CatsService) {

    }

    //implementar el index
    //retorna la lista de todos los gatos
    @Get()
    allCats(): Cat[] {
        //de donde se toman los gatos
        return this.catsService.allsCats();
    }

    //metodoque de retorne un Cat por su ID
    @Get(':id')
    getById(@Param('id', new ParseIntPipe()) id: number): Cat | undefined {
        //Retornar desde el servicio
        return this.catsService.getById(id)
    }

    ///// nuevo
    @Post() //cats
    create(@Body() createCatDto: CreateCatDto): Cat {
        // guardar el registro en el servicio

        return this.catsService.create(createCatDto)

    }

    // actualizar el registro
    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() updateCatDto: UpdateCatDto,): string {
        return this.catsService.update(id, updateCatDto);

    }


    // immplementar el delete: solo recibe el id
    // invoca
    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number): string {
        return this.catsService.delete(id);
    }




}
