import { IsDate, IsString } from 'class-validator';

export class UpdateUserDetailDto {
	@IsString()
	nombre: string;

	@IsString()
	apellido: string;

	@IsDate()
	fechaNac: Date;
}