import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & mongoose.Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @Prop({ required: true })
  firstName: string;

  @Field(() => String)
  @Prop({ required: true })
  lastName: string;

  @Field(() => String)
  @Prop({ required: true })
  phone: string;

  @Field(() => String)
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  confirmed: boolean;

  @Field(() => Boolean)
  @Prop({ default: true })
  active: boolean;

  @Field(() => [String])
  @Prop({ default: [], type: [mongoose.Types.ObjectId], ref: 'Catalog' })
  catalogs: string[];

  comparePassword: (pass: string) => boolean;
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  commerceName: string;

  @Field(() => ID)
  commerceType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  pass: string,
): Promise<boolean> {
  return await bcrypt.compare(pass, this.password);
};
