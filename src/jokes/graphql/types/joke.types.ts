import { Field, Int, ObjectType } from "@nestjs/graphql"


@ObjectType('Flags')
export class FlagsType {
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

@ObjectType('Joke')
export class JokeType {
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
    
    @Field(() => FlagsType)
    flags: FlagsType

    @Field()
    safe: boolean

    @Field()
    lang: string
}

