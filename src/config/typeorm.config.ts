import { Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm'

const DEFAULT_PSQL_HOST = 'localhost'
const DEFAULT_PSQL_PORT = 5432

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const logger = new Logger('TypeORM Configuration')
        const database = configService.get<string>('PSQL_DATABASE')

        if (database === undefined) {
            throw new Error(
                "Environment variable 'PSQL_DATABASE' cannot be undefined",
            )
        }

        let syncMode = false
        let dropDB = false

        const nodeEnv = configService.get<string>('NODE_ENV')
        if (nodeEnv === 'development') {
            syncMode = Boolean(+configService.get('SYNC_MODE'))
            logger.warn('Synchronization mode is activated')
            if (syncMode) {
                dropDB = Boolean(+configService.get('DROP_DATABASE'))
                if(dropDB) {
                    logger.warn(
                        'Drop database mode is active. All saved data will be deleted!',
                    )
                }
            }
        }

        return {
            type: 'postgres',
            entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
            database,
            host: configService.get('PSQL_HOST') || DEFAULT_PSQL_HOST,
            port: configService.get('PSQL_PORT') || DEFAULT_PSQL_PORT,
            username: configService.get('PSQL_USERNAME'),
            password: configService.get('PSQL_PASSWORD'),
            synchronize: syncMode,
            dropSchema: dropDB,
        }
    },
    inject: [ConfigService],
}
