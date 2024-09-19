import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CategoryDocument = Category & mongoose.Document;

@Schema()
@ObjectType()
export class Category {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  name: string;
}

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => ID)
  userId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
