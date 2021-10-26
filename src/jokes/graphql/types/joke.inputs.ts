import { Field, InputType } from "@nestjs/graphql"

import { JokeFiltersDto} from "src/jokes/dtos/joke-filters.dto"
import { Flags } from "src/jokes/interfaces/joke.interfaces"


@InputType('BlacklistFlags')
export class BlacklistFlags implements Flags {
    @Field({defaultValue: false})
    nsfw : boolean

    @Field({defaultValue: false})
    religious : boolean

    @Field({defaultValue: false})
    political : boolean

    @Field({defaultValue: false})
    racist : boolean

    @Field({defaultValue: false})
    sexist : boolean

    @Field({defaultValue: false})
    explicit : boolean
}



@InputType('JokeFilters')
export class JokeFiltersInput implements JokeFiltersDto {
    @Field(() => [String], {defaultValue: ['Any']})
    categories: string[]
    
    @Field({nullable: true})
    type?: string

    @Field(() => BlacklistFlags, {nullable: true})
    blacklistFlags?: BlacklistFlags

    @Field({nullable: true})
    language?: string

    @Field({nullable: true})
    contains?: string

}

  