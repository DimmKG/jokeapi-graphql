import { Field, Int, ObjectType } from "@nestjs/graphql"


@ObjectType()
export class Flags {
    @Field()
    nsfw : boolean

    @Field()
    religious : boolean

    @Field()
    political : boolean

    @Field()
    racist : boolean

    @Field()
    sexist : boolean

    @Field()
    explicit : boolean
}

@ObjectType()
export class Joke {
    @Field(() => Int)
    id: number

    @Field()
    error: false

    @Field()
    category: string

    @Field()
    type: string

    @Field({nullable: true})
    joke?: string

    @Field({nullable: true})
    setup?: string

    @Field({nullable: true})
    delivery?: string
    
    @Field(() => Flags)
    flags: Flags

    @Field()
    safe: boolean

    @Field()
    lang: string
}

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