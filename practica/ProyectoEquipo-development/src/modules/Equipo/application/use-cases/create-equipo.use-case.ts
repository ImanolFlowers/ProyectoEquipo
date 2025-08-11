import { Injectable } from "@nestjs/common";
import { IEquipoRepository } from "../../domain/interfaces/product-repository.interface";
import { CreateEquipoDto } from "../dtos/create-equipo.dto";
import { Equipo } from "../../domain/entities/equipos";

@Injectable()
export class CreateEquipoUseCase {
  constructor(private readonly equipoRepository: IEquipoRepository) {}

  async execute(dto: CreateEquipoDto): Promise<Equipo | null> {
    const equipo = new Equipo(
      '',
      dto.nombre,
      true,
      new Date(),
      dto.escudo ?? "",
      dto.location ?? "",
      dto.representante ?? ""
    );


    return this.equipoRepository.create(equipo);
  }
}
