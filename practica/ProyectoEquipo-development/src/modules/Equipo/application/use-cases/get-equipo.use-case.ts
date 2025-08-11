import { Injectable } from "@nestjs/common";
import { Equipo } from "../../domain/entities/equipos";
import { IEquipoRepository } from "../../domain/interfaces/product-repository.interface";


@Injectable()
export class GetEquipoUseCase{
    constructor(private readonly equipoRepository: IEquipoRepository){}

    /**
     * Metodo para ejetar el caso de uso
     * @param dto
     * @returns Equipo registrado o null
     */

    async execute(): Promise<Equipo[]> {

        return this.equipoRepository.getAll();
    }
}