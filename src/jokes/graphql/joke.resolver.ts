import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Int, Query, Resolver } from '@nestjs/graphql'

import { AuthGuard } from 'src/auth/guards/auth.guard'

import { Joke } from '../interfaces/joke.interfaces'
import { JokesService } from '../jokes.service'

import { JokeFiltersInput } from './types/joke.inputs'
import { JokeType } from './types/joke.types'
@Resolver(() => JokeType)
export class JokesResolver {
    constructor(private readonly _jokesService: JokesService) {}

    @UseGuards(AuthGuard)
    @Query(() =>  JokeType, {
        description: '[Jokes] Get a joke from JokeAPI'
    })
    async joke(@Args('filters', {type: () => JokeFiltersInput, nullable: true}) filters?: JokeFiltersInput): Promise<Joke> {
        return await this._jokesService.getJoke(filters)
    }

    @UseGuards(AuthGuard)
    @Query(() =>  [JokeType], {
        description: '[Jokes] Get jokes from JokeAPI'
    })
    async jokes(@Args('filters', {type: () => JokeFiltersInput, nullable: true}) filters?: JokeFiltersInput,
                @Args('amount', {
                    type: () => Int, 
                    defaultValue: 1,
                    description: 'Sets max amount of jokes in a response'
                }) amount = 1) : Promise<Joke[]> {
        if(amount <= 0) {
            throw new HttpException('Amount should be greater than zero', HttpStatus.BAD_REQUEST)
        }
        if(amount === 1) {
            return [await this._jokesService.getJoke(filters)]
        }

        return await this._jokesService.getJokes(amount, filters)
    }
}
