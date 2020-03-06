import { IsNotEmpty, IsString } from 'class-validator';

export class RegistroDto {
	@IsString()
	@IsNotEmpty()
	dni: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	nombre: string;

	apellido: string;

	fechaNac?: Date;

	@IsNotEmpty()
	@IsString()
	telefono: string;

	@IsNotEmpty()
	@IsString()
	email: string;

}