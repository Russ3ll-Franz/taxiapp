import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ReadUserDetailDto } from './read-user-detail.dto';
import { ReadUserRoleDto } from './read-user-role.dto';

@Exclude()
export class ReadUserDto {
	@Expose()
	@IsNumber()
	readonly idUser: number;

	@Expose()
	@IsString()
	readonly email: string;

	@Expose()
	@Type(type => ReadUserDetailDto)
	readonly detalle: ReadUserDetailDto;

	@Expose()
	@Type(type => ReadUserRoleDto)
	readonly roles: ReadUserRoleDto[];
}