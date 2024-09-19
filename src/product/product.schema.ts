import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProductDocument = Product & mongoose.Document;

@Schema()
@ObjectType()
export class Product {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Field(() => ID)
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Catalog' })
  catalogId: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  description: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  price: string;

  @Field(() => ID)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Category' })
  category: string;

  @Field(() => String)
  @Prop()
  image: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  isPromo: boolean;

  @Field(() => Boolean)
  @Prop({ default: true })
  active: boolean;
}

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  catalogId: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  description: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  price: string;

  @Field(() => String)
  @Prop()
  image?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
