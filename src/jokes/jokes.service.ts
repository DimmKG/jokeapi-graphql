import { Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server-errors'
import axios from 'axios'

import { Joke, JokeResult } from './interfaces/joke.interfaces'

@Injectable()
export class JokesService {
    async getJoke(categories: string[]) : Promise<Joke> {
        const category = categories ? categories.join(',') : 'Any'
        const response  = await axios.get<JokeResult>('https://v2.jokeapi.dev/joke/' + category)
            .catch((e) => {
                throw new ApolloError(
                    'Unable to get a joke from the JokeAPI server.',
                    undefined,
                    { error: {message: e.message, code: e.code} }
                )
            })
        const result =  response.data
        if(result.error) {
            throw new UserInputError(result.message + '.' + result.additionalInfo, {error: result})
        }
        return result
    }
        
}