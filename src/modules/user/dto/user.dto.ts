import { IsNotEmpty } from 'class-validator';
import { RoleType } from '../../role/role.enum';
import { UserDetails } from '../entity/user.details.entity';

export class UserDto {
	@IsNotEmpty()
	idUser: number;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	roles: RoleType[];

	@IsNotEmpty()
	detalle: UserDetails;
}