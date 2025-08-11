import { PrismaService } from "src/core/databases/prisma.service";
import { CreateEquipoDto } from "../../application/dtos/create-equipo.dto";

export class EquiposRepository{

    constructor (private readonly prisma:PrismaService){}

    async create (dto: CreateEquipoDto) {
        return this.prisma.temporada.create({data: {nombre: dto.nombre}});
    }

    async findAll()
}