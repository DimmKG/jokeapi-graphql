import { Joke } from '../graphql/types/joke.graphql-types'
export class JokeError {
    error: true

    internalError: boolean

    code: number

    message: string

    causedBy: string[]

    additionalInfo: string

    timestamp: number
}



export type JokeResult = Joke | JokeError