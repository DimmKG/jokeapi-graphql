import { Module } from '@nestjs/common'

import { AuthModule } from 'src/auth/auth.module'

import { JokesResolver } from './joke.resolver'
import { JokesService } from './jokes.service'

@Module({
  imports: [AuthModule],
  providers: [JokesService, JokesResolver]
})
export class JokesModule {}
