import { ApiProperty } from "@nestjs/swagger";

export class UsuarioUpdate{

    @ApiProperty({required: true, description: "Nombre del usuario"})
      name?: string;
    
    @ApiProperty({required:true, description: 'Apellido del usuario'})
      apellido?: string;
    
    @ApiProperty({required: true, description: "Contraseña del usuario"}) 
      password?: string;
    
    @ApiProperty({required: true, description: "Email del usuario"}) 
    email?: string;
    
    @ApiProperty({required: true, description: "usename del usuario"})
    username?: string;
    
    @ApiProperty({required: true, description: "Telefono del usuario"}) 
    telefono?: string;
    
    @ApiProperty({required: true, description: "Foto del usuario"})     
    image?: string;       
}

export class UsuarioUpdateResponsive{
    users: UsuarioUpdate;
}