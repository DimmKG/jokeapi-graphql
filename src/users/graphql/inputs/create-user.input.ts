import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Matches } from 'class-validator'

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail(undefined, { message: 'Incorrect email'})
    email: string

    @Field()
    @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/, {
        message:
          'Password must be least eight characters, at least one letter and one number',
      })
    password: string
}
