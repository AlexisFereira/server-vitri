import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Category,
  CategoryDocument,
  CreateCategoryInput,
} from './category-list.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryListService {
  constructor(
    @InjectModel(Category.name) private model: Model<CategoryDocument>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.model.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    return await this.model.findById(id);
  }

  async createCategory(input: CreateCategoryInput): Promise<Category> {
    const newCategory = new this.model(input);
    await newCategory.save();
    return newCategory;
  }
}
