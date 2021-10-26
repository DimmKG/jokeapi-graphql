import { Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server-errors'
import axios from 'axios'

import { JokeFiltersDto } from './dtos/joke-filters.dto'
import { Flags, Joke, JokeResult} from './interfaces/joke.interfaces'

@Injectable()
export class JokesService {
    async getJoke(filters: JokeFiltersDto) : Promise<Joke> {
        const category = filters.categories ? filters.categories.join(',') : 'Any'
        
        let flags : string | undefined
        if(filters.blacklistFlags) {
            const flagsString = this._getFlagsString(filters.blacklistFlags)
            if(flagsString) {
                flags = flagsString
            }
        }


        const queryParams = {
            blacklistFlags: flags,
            lang: filters.language,
            type: filters.type,
            contains: filters.contains
        }


        const response  = await axios.get<JokeResult>(
            'https://v2.jokeapi.dev/joke/' + category, {params: queryParams})
            .catch((e) => {
                throw new ApolloError(
                    'Unable to get a joke from the JokeAPI server.',
                    undefined,
                    { error: {message: e.message, code: e.code} }
                )
            })
        const result =  response.data
        if(result.error) {
            throw new UserInputError(result.message + '. ' + result.additionalInfo, {error: result})
        } 
        return result
    }

    private _getFlagsString(flags: Flags) : string | undefined {
        const result : string[] = []
        if(flags.nsfw) {
            result.push('nsfw')
        }
        if(flags.explicit) {
            result.push('explicit')
        } 
        if(flags.political) {
            result.push('political')
        }
        if(flags.racist) {
            result.push('racist')
        }
        if(flags.religious) {
            result.push('religious')
        }
        if(flags.sexist) {
            result.push('sexist')
        }
        
        if(result.length) {
            return result.join(',')
        }
        return undefined
    }
        
}