import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CommerceList,
  CreateCommerceListItem,
  CreateManyCommerceListItem,
} from './commerce-list.schema';

@Injectable()
export class CommerceListService {
  constructor(
    @InjectModel(CommerceList.name) private model: Model<CommerceList>,
  ) {}

  async createCommerceItem(
    item: CreateCommerceListItem,
  ): Promise<CommerceList> {
    const itemInList = new this.model(item);
    await itemInList.save();
    return itemInList;
  }

  async createCommerceItems(
    fields: CreateManyCommerceListItem,
  ): Promise<CommerceList[]> {
    return await this.model.insertMany(fields.fields);
  }

  async getCommerceList(): Promise<CommerceList[]> {
    return await this.model.find();
  }

  async getCommerceItemById(id: string): Promise<CommerceList> {
    return await this.model.findById(id);
  }
}
