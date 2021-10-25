import { Args, Query, Resolver } from '@nestjs/graphql'

import { Joke } from '../interfaces/joke.interfaces'
import { JokesService } from '../jokes.service'

import { JokeType } from './types/joke.graphql-types'
@Resolver(() => JokeType)
export class JokesResolver {
    constructor(private _jokesService: JokesService) {}

    @Query(() =>  JokeType)
    async joke(@Args('categories', {type: () => [String], nullable: true}) categories: string[]): Promise<Joke> {
        return await this._jokesService.getJoke(categories)
    }
}
