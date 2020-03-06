import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/repository/role.repository';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository, RoleRepository]),
		AuthModule,
	],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule { }