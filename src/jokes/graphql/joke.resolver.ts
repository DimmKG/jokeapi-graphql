import { Args, Query, Resolver } from '@nestjs/graphql'

import { JokeResult } from '../interfaces/joke.interfaces'
import { JokesService } from '../jokes.service'

import { Joke } from './types/joke.graphql-types'
@Resolver(() => Joke)
export class JokesResolver {
    constructor(private _jokesService: JokesService) {}

    @Query(() =>  Joke)
    joke(@Args('categories', {type: () => [String], nullable: true}) categories: string[]): Promise<JokeResult> {
        return this._jokesService.getJoke(categories)
    }
}
