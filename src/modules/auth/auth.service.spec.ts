import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../role/role.enum';
import { User } from '../user/entity/user.entity';
import { LoginDto, RegistroDto } from './dto';
import { IJwtPayload } from './payload/jwt-payload.interface';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(AuthRepository)
		private readonly _authRepository: AuthRepository,
		private readonly _jwtService: JwtService,
	) { }

	async registro(registroDto: RegistroDto): Promise<void> {
		const { email } = registroDto;

		const userExist = await this._authRepository.findOne({
			where: { email },
		});

		if (userExist) {
			throw new ConflictException('El Documento ya existe');
		}

		return this._authRepository.register(registroDto);
	}

	async login(loginDto: LoginDto): Promise<{ token: string }> {
		const { email, password } = loginDto;

		const user: User = await this._authRepository.findOne({
			where: { email },
		});

		if (!user) {
			throw new NotFoundException('El Documento no existe');
		}

		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			throw new UnauthorizedException('Credenciales Invalida');
		}

		const payload: IJwtPayload = {
			idUser: user.idUser,
			email: user.email,
			roles: user.roles.map(r => r.nombre as RoleType),
		};

		const token = await this._jwtService.sign(payload);

		return { token };
	}
}