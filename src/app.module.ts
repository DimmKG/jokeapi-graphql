
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from './config/config'
import { typeOrmConfig } from './config/typeorm.config'
import { JokesModule } from './jokes/jokes.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        GraphQLModule.forRoot({
            autoTransformHttpErrors: true, //It doesn't work (INTERNAL_SERVER_ERROR)
            autoSchemaFile: true
        }),
        JokesModule,
    ],
})
export class AppModule {}
