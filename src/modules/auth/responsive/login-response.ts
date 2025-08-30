import { ApiProperty } from "@nestjs/swagger";

export class UserLogued {
    @ApiProperty()
    name: string

    @ApiProperty()
    email: string
}

export class LoginResponse {
    @ApiProperty({description: "Usuario autenticado"})
    username: UserLogued

    @ApiProperty()
    acces_Token: string
}