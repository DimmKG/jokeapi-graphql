import { forwardRef, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../auth/auth.module'

import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Module({
    imports: [
        ConfigService,
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
