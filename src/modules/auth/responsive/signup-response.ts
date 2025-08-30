import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../modules/users/dto/create-user.dto";

export class userSignup{
    @ApiProperty()
    id: string;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    apellido?: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: Role;
}

export class signupResponse{
    @ApiProperty({description: "Usuario agregado"})
    user: userSignup;
}