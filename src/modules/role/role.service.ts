import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Status } from '../../shared/status.enum';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entity/role.entity';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(RoleRepository)
		private readonly _roleRepository: RoleRepository,
	) { }

	async get(roleId: number): Promise<ReadRoleDto> {
		if (!roleId) {
			throw new BadRequestException('Id necesario');
		}

		const role: Role = await this._roleRepository.findOne(roleId, {
			where: { status: Status.ACTIVO },
		});

		if (!role) {
			throw new NotFoundException();
		}

		return plainToClass(ReadRoleDto, role);
	}

	async getAll(): Promise<ReadRoleDto[]> {
		const roles: Role[] = await this._roleRepository.find({
			where: { status: Status.ACTIVO },
		});

		return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
	}

	async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
		const saveRole: Role = await this._roleRepository.save(role);
		return plainToClass(ReadRoleDto, saveRole);
	}

	async update(
		roleId: number,
		role: Partial<UpdateRoleDto>,
	): Promise<ReadRoleDto> {
		const foundRole: Role = await this._roleRepository.findOne(roleId, {
			where: { status: Status.ACTIVO },
		});

		if (!foundRole) {
			throw new NotFoundException('No existe');
		}

		foundRole.nombre = role.nombre;
		foundRole.descripcion = role.descripcion;

		const updateRole: Role = await this._roleRepository.save(foundRole);

		return plainToClass(ReadRoleDto, updateRole);
	}

	async delete(roleId: number): Promise<void> {
		const roleExist: Role = await this._roleRepository.findOne(roleId, {
			where: { status: Status.ACTIVO },
		});

		if (!roleExist) {
			throw new NotFoundException();
		}

		await this._roleRepository.update(roleId, {
			status: Status.INACTIVO,
		});
	}
}