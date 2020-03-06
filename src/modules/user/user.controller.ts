import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
	constructor(private readonly _userService: UserService) { }

	@Get(':userId')
	// @Roles(RoleType.ADMIN, RoleType.SUPERVISOR)
	// @UseGuards(AuthGuard(), RoleGuard)
	getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
		return this._userService.get(userId);
	}

	@Get()
	// @Roles(RoleType.ADMIN, RoleType.SUPERVISOR)
	// @UseGuards(AuthGuard(), RoleGuard)
	getUsers(): Promise<ReadUserDto[]> {
		return this._userService.getAll();
	}

	@Patch(':userId')
	// @Roles(RoleType.ADMIN, RoleType.SUPERVISOR)
	// @UseGuards(AuthGuard(), RoleGuard)
	updateUser(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() user: Partial<UpdateUserDto>,
	) {
		return this._userService.update(userId, user);
	}

	@Delete(':userId')
	// @Roles(RoleType.ADMIN, RoleType.SUPERVISOR)
	// @UseGuards(AuthGuard(), RoleGuard)
	deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
		return this._userService.delete(userId);
	}

	@Post('agregarRol/:userId/:roleId')
	setRoleToUser(
		@Param('userId', ParseIntPipe) userId: number,
		@Param('roleId', ParseIntPipe) roleId: number,
	): Promise<boolean> {
		return this._userService.setRoleToUser(userId, roleId);
	}
}