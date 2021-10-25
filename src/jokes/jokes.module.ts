import { Module } from '@nestjs/common'

import { JokesResolver } from './graphql/joke.resolver'
import { JokesService } from './jokes.service'

@Module({
  providers: [JokesService, JokesResolver]
})
export class JokesModule {}
