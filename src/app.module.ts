import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.enum';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { TarifaModule } from './modules/tarifa/tarifa.module';
import { UserModule } from './modules/user/user.module';


@Module({
	imports: [ConfigModule, DatabaseModule, AuthModule, TarifaModule, UserModule, RoleModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	static port: string | number;

	constructor(private readonly _configService: ConfigService) {
		AppModule.port = this._configService.get(Configuration.PORT);
	}
}
