import { RoleType } from '../../role/role.enum';

export interface IJwtPayload {
	idUser: number;

	email: string;

	roles: RoleType[];

	iat?: string;
}