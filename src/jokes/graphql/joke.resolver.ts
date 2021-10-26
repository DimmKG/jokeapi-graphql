import { Args, Query, Resolver } from '@nestjs/graphql'

import { Joke } from '../interfaces/joke.interfaces'
import { JokesService } from '../jokes.service'

import { JokeFiltersInput } from './types/joke.inputs'
import { JokeType } from './types/joke.types'
@Resolver(() => JokeType)
export class JokesResolver {
    constructor(private readonly _jokesService: JokesService) {}

    @Query(() =>  JokeType, {
        description: '[Jokes] Get a joke from JokeAPI'
    })
    async joke(@Args('filters', {type: () => JokeFiltersInput}) filters: JokeFiltersInput): Promise<Joke> {
        return await this._jokesService.getJoke(filters)
    }
}
