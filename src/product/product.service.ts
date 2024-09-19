import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductInput, Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private model: Model<ProductDocument>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.model.find();
  }

  async getProductById(id: string): Promise<Product> {
    return await this.model.findById(id);
  }

  async createProduct(input: CreateProductInput): Promise<Product> {
    const product = new this.model(input);
    await product.save();
    return product;
  }
}
