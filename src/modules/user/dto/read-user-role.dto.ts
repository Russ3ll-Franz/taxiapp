import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadUserRoleDto {
	@Expose()
	@IsString()
	nombre: string;
}