
import { IncomingMessage } from 'http'

import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'


import { AuthService } from '../auth.service'


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly _authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const req = ctx.getContext().req as IncomingMessage

        const authorization = req?.headers?.authorization

        if (authorization == undefined) {
            throw new BadRequestException(
                'GqlAuthorizationHeader: Authorization is required. Empty Authorization header has found',
            )
        }

        const verified = await this._authService.decodeToken(authorization)

        return !!verified
    }
}
