// definir los datos que vamos
// a recibir 
export class UpdateCatDto {
    // podemos dejar las propiedades como opcional
    // (que puede no venir en el update)
    name?: string;
    color?: string;
    age?: number;
}

