import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadRoleDto {
	@IsNumber()
	@Expose()
	readonly idRol: number;

	@Expose()
	@IsString()
	@MaxLength(20, { message: 'Este nombre es invalido' })
	readonly nombre: string;

	@Expose()
	@IsString()
	@MaxLength(100, { message: 'Maximo de Caracteres' })
	readonly descripcion: string;
}