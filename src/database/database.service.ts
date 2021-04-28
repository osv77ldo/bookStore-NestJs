import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService){
            return{
                ssl: false,
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                port: 5432,
                database: config.get(Configuration.DATABASE),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [ __dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions;
        }
    })
]