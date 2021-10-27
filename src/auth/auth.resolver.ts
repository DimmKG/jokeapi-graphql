import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateUserInput } from '../users/graphql/inputs/create-user.input'
import { UserType } from '../users/graphql/types/user.type'

import { AuthService } from './auth.service'
import { AuthType } from './graphql/types/auth.type'

@Resolver(() => String)
export class AuthResolver {
    constructor(private readonly _authService: AuthService) {}

    @Mutation(() => UserType, {description: 'Create new account'})
    async signUp(@Args('input') input: CreateUserInput): Promise<UserType> {
        const response = await this._authService.signUp(input)

        return response
    }

    @Query(() => AuthType, {description: 'Sign in to an account'})
    async signIn(@Args('input') input: CreateUserInput): Promise<AuthType> {
        const response = await this._authService.signIn(input)

        return response
    }

    @Mutation(() => AuthType)
    async refreshToken(
        @Args('refreshToken') refreshToken: string,
        @Args('accessToken') accessToken: string,
    ): Promise<AuthType> {
        return await this._authService.getAccessTokenFromRefreshToken(
            refreshToken,
            accessToken,
        )
    }
}
