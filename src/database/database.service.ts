import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.enum';
import { ConfigModule } from 'src/config/config.module';
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';


export const databaseProvider = [
	TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		async useFactory(_config: ConfigService) {
			return {
				type: 'mysql' as 'mysql',
				host: _config.get(Configuration.DB_HOST),
				database: _config.get(Configuration.DB_NAME),
				username: _config.get(Configuration.DB_USERNAME),
				password: _config.get(Configuration.DB_PASSWORD),
				entities: [__dirname + '/../**/**/**/*.entity.ts'],
				migrations: [__dirname + '/migrations/*.ts'],
				synchronize: true,
				logging: true
			} as ConnectionOptions;
		},
	}),
];