import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UsersService {
    constructor(private prismmaService: PrismaService) {
    
        }

    //metodo para registrar usuario y buscar usuario

    async findByUserName(username: string): Promise<User | null>{
        return{
            id: "jojojojo",
            name: "Dayry",
            username: "Mibzar",
            email: "Dani@gmail.com",
            password: "Ima",
            active: true,
            createAt: new Date(),
            updateAt: null,
        }
    }
    
}
