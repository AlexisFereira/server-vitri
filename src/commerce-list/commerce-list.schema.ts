import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CommerceListDocument = CommerceList & mongoose.Document;

@Schema()
@ObjectType()
export class CommerceList {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @Prop({ required: true, type: String, unique: true, index: true })
  name: string;

  @Field(() => String)
  @Prop()
  description: string;
}

@InputType()
export class CreateCommerceListItem {
  @Field(() => String)
  name: string;
}

@InputType()
export class CreateManyCommerceListItem {
  @Field(() => [CreateCommerceListItem])
  fields: CreateCommerceListItem[];
}

export const CommerceListSchema = SchemaFactory.createForClass(CommerceList);
