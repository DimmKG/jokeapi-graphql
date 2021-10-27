import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshTokenEntity } from '../users/entities/refresh-token.entity'
import { UsersModule } from '../users/users.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
    imports: [
        UsersModule,
        ConfigService,
        TypeOrmModule.forFeature([RefreshTokenEntity]),
        forwardRef(() => UsersModule),
    ],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
