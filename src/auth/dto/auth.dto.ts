import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/users.schema';

@InputType()
export class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  user: User;

  @Field()
  access_token: string;
}

@ObjectType()
export class ResetTokenResponse {
  @Field(() => Boolean)
  exists: boolean;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class ResetTokenIsValid {
  @Field(() => Boolean)
  isValid: boolean;
}

@ObjectType()
export class ExistEmail {
  @Field(() => Boolean)
  existEmail: boolean;
}
