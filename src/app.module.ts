
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { config } from './config/config'
import { typeOrmConfig } from './config/typeorm.config'
import { JokesModule } from './jokes/jokes.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot(config),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        GraphQLModule.forRoot({
            autoTransformHttpErrors: true,
            autoSchemaFile: true
        }),
        AuthModule,
        UsersModule,
        JokesModule,
    ],
})
export class AppModule {}
