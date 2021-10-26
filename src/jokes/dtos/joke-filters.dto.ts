
import { Flags } from "../interfaces/joke.interfaces"

export interface JokeFiltersDto {

    categories?: string[]

    type?: string

    blacklistFlags?: Flags

    language?: string

    contains?: string
}

