import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadUserDetailDto {
	@IsString()
	@Expose()
	readonly nombre: string;

	@IsString()
	@Expose()
	readonly apellido: string;
}