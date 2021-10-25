export class JokeError {
    error: true

    internalError: boolean

    code: number

    message: string

    causedBy: string[]

    additionalInfo: string

    timestamp: number
}

export interface Joke {
    id: number

    error: false

    category: string

    type: string

    joke?: string

    setup?: string

    delivery?: string
    
    flags: Flags

    safe: boolean

    lang: string
}

export interface Flags {
    nsfw : boolean

    religious : boolean

    political : boolean

    racist : boolean

    sexist : boolean

    explicit : boolean
}


export type JokeResult = Joke | JokeError