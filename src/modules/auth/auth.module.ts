import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../../config/config.enum';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([AuthRepository]),
		PassportModule.register({
			defaultStrategy: 'jwt', session: true
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(config: ConfigService) {
				return {
					secret: config.get(Configuration.JWT_SECRET),
					signOptions: {
						expiresIn: 3600,
					},
				};
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, ConfigService, JwtStrategy],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }