
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from './repository/role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
	imports: [TypeOrmModule.forFeature([RoleRepository]), AuthModule],
	providers: [RoleService],
	controllers: [RoleController],
})
export class RoleModule { }