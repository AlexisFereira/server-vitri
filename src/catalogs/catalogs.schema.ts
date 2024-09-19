import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CatalogDocument = Catalog & mongoose.Document;

@ObjectType()
export class extraFields {
  @Field(() => String)
  @Prop()
  address: string;

  @Field(() => String)
  @Prop()
  schedule: string;
}

@Schema()
@ObjectType()
export class Catalog {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  commerceName: string;

  @Field(() => ID)
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'CommerceList' })
  commerceType: string;

  @Field(() => String)
  @Prop({ default: [], type: mongoose.Types.ObjectId, ref: 'Category' })
  categories: string[];

  @Field(() => String)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Products', default: [] })
  products: string;

  @Field(() => Boolean)
  @Prop({ default: true })
  active: boolean;

  @Field(() => extraFields)
  @Prop({ default: {} })
  extraFields: extraFields;
}

@InputType()
export class CreateCatalogInput {
  @Field(() => String)
  commerceName: string;

  @Field(() => ID)
  commerceType: string;

  @Field(() => ID)
  userId: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
