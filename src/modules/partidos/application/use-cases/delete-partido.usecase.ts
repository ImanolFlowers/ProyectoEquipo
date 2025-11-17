import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaPartidosRepository } from '../../infraestructure/repositories/prisma-partidos.repository';

@Injectable()
export class DeletePartidoUseCase {
    constructor(private readonly partidoRepo: PrismaPartidosRepository) {}

    async execute(id: string): Promise<{ message: string }> {
        // Verificar que el partido exista
        const partidoExistente = await this.partidoRepo.findById(id);
        if (!partidoExistente) {
        throw new NotFoundException(`Partido no encontrado con id ${id}`);
        }

        // Eliminar partido usando el repositorio
        await this.partidoRepo.delete(id);

        // Retornar mensaje de confirmación
        return { message: `Partido con id ${id} eliminado correctamente.` };
    }
}
