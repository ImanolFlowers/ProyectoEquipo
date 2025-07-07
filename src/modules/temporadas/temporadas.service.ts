import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { CreateTemporadaDto } from './application/dtos/create-temporada.dto';
import { UpdateTemporadaDto } from './application/dtos/update-temporada.dto';


@Injectable()
export class TemporadasService {
    constructor(private prismaService: PrismaService) {}
    

    async create(dto: CreateTemporadaDto) {
        return this.prismaService.temporada.create({
        data: {
            nombre: dto.nombre,
        },
        });
    }

    findAll() {
        return this.prismaService.temporada.findMany();
    }


    update(id: string, dto: UpdateTemporadaDto) {
        return this.prismaService.temporada.update({
        where: { id },
        data: dto,
        });
    }


    delete(id: string) {
        return this.prismaService.temporada.delete({
        where: { id },
        });
    }


}