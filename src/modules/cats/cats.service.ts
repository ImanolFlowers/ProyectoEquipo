import { Injectable, RequestTimeoutException } from '@nestjs/common';
import {Cat} from './types/cat.type'
import { CreateCatDto } from './dtos/create-cat.dto';
import { UpdateCatDto } from './dtos/updade-cat.dto';

@Injectable()
export class CatsService {
    cats: Cat[];

    constructor(){
        this.cats = [
            {
                id: 1,
                name: "Pachón",
                color: "Gris",
                age: 3
            }
        ];
    }

    allsCats(): Cat[]{
        return this.cats;
    }

    getById(id: number): Cat | undefined{
        //como encuentro en e array, el registro
        //con es ID
        return this.cats.find((cat => cat.id === id))
    }

    ////// Nuevo
    // metodo para guardar el nuevo registro
    create(cat: CreateCatDto): Cat {
        // crear nuevo registro y asignar su id
        const newCat: Cat  ={
            id: (this.cats.findLast((item) => item.id > 0)?.id || 1) + 1,
            ...cat, // toma los parametros del parametro cat
        };

        this.cats.push(newCat);
        return newCat
    }

    update(id: number, cat: UpdateCatDto){
        // encontrar el registro en el array this.cats
        const encontrarCats = this.cats.findIndex(cats => cats.id === id);
           if (encontrarCats === -1) {
            return 'No se encontro el registro'
           }

        // actualizar sus datos
        this.cats[encontrarCats] = {
            ...this.cats[encontrarCats],
            ...cat,
        };

        // remplazar el objeto en el array

        // retornar el mensaje
        return 'Registro actualizado'
        
    }

    delete(id: number): string {
    const eliminarCat = this.cats.findIndex(cat => cat.id === id);
        if (eliminarCat === -1) {
            return 'No se encontró el registro';
    }
    this.cats.splice(eliminarCat, 1);
    return 'Registro eliminado';
}



    
    
   
   


}
