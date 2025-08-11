import { Injectable } from "@nestjs/common";
import { IEquipoRepository } from "../../domain/interfaces/product-repository.interface";
import { Equipo } from "../../domain/entities/equipos";



/**
 * Repositorio para equipos que usa memoria temporal
 */


@Injectable()
export class MemoryEquiposRepository implements IEquipoRepository{
    #equipos: Equipo[];

    constructor(){
        this.#equipos = [];
    }

    async create(equipo: Equipo): Promise<Equipo | null> {
    console.log(equipo);

    equipo.setId(`p-${this.#equipos.length + 1}`);
    this.#equipos.push(equipo);

    return equipo;
    }
    
    async getAll(): Promise<Equipo[]> {
        return this.#equipos;
    }

    async getById(id: string): Promise<Equipo | null> {
        return this.#equipos.find((item) => item.id == id) || null;
    }
}