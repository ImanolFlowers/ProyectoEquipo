import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({required: true, description: "Usuario de la persona"})
    username: string

    @ApiProperty({required: true, description: "Contraseña de la personal"})
    password:string
}