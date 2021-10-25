import { Module } from '@nestjs/common'

import { JokesResolver } from './jokes.resolver'
import { JokesService } from './jokes.service'

@Module({
  providers: [JokesService, JokesResolver]
})
export class JokesModule {}
