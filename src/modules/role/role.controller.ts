import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './decorators/role.decorator';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dto';
import { RoleGuard } from './guards/role.guard';
import { RoleType } from './role.enum';
import { RoleService } from './role.service';

@Controller('roles')
@UseGuards(AuthGuard())
export class RoleController {
	constructor(private readonly _roleService: RoleService) { }

	@Get(':roleId')
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
		return this._roleService.get(roleId);
	}

	@Get()
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	getRoles(): Promise<ReadRoleDto[]> {
		return this._roleService.getAll();
	}

	@Post()
	createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
		return this._roleService.create(role);
	}

	@Patch(':roleId')
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	updateRole(
		@Param('roleId', ParseIntPipe) roleId: number,
		@Body() role: Partial<UpdateRoleDto>,
	): Promise<ReadRoleDto> {
		return this._roleService.update(roleId, role);
	}

	@Delete(':roleId')
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
		return this._roleService.delete(roleId);
	}
}
