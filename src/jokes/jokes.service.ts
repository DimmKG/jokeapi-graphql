import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import axios from 'axios'

import { JokeFiltersDto } from './dtos/joke-filters.dto'
import { Flags, Joke, JokeResult, JokeArrayResult} from './interfaces/joke.interfaces'

type QueryParams = {
    blacklistFlags?: string
    lang?: string
    type?: string
    contains?: string
    amount?: number
}
@Injectable()
export class JokesService {
    async getJoke(filters?: JokeFiltersDto) : Promise<Joke> {
        let category = 'Any'
        if(filters) {
            category = filters.categories ? filters.categories.join(',') : 'Any'
        }
        const queryParams = this._getQueryParams(filters)

        const response  = await axios.get<JokeResult>(
            'https://v2.jokeapi.dev/joke/' + category, {params: queryParams})
            .catch((e) => {
                throw new HttpException({
                    message: 'Unable to get a joke from the JokeAPI server.',
                    error: {message: e.message, code: e.code}
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR)
            })

        const result =  response.data
        if(result.error) {
            throw new HttpException({
                message: result.message + '. ' + result.additionalInfo,
                error: result
            },
            HttpStatus.BAD_REQUEST)
        } 
        return result
    }

    async getJokes(amount: number, filters?: JokeFiltersDto) : Promise<Joke[]> {
        let category = 'Any'
        if(filters) {
            category = filters.categories ? filters.categories.join(',') : 'Any'
        }
        const queryParams = this._getQueryParams(filters, amount)

        const response  = await axios.get<JokeArrayResult>(
            'https://v2.jokeapi.dev/joke/' + category, {params: queryParams})
            .catch((e) => {
                throw new HttpException({
                    message: 'Unable to get a joke from the JokeAPI server.',
                    error: {message: e.message, code: e.code}
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR)
            })

        const result =  response.data
        if(result.error) {
            throw new HttpException({
                message: result.message + '. ' + result.additionalInfo,
                error: result
            },
            HttpStatus.BAD_REQUEST)
        } 
        return result.jokes
    }

    private _getQueryParams(filters?: JokeFiltersDto, amount = 1) : QueryParams {
        if(!filters) {
            return { amount }
        }
        
        let flags : string | undefined
        if(filters.blacklistFlags) {
            const flagsString = this._getFlagsString(filters.blacklistFlags)
            if(flagsString) {
                flags = flagsString
            }
        }

        return {
            blacklistFlags: flags,
            lang: filters.language,
            type: filters.type,
            contains: filters.contains,
            amount
        }
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