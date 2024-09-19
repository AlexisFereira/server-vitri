import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Catalog,
  CatalogDocument,
  CreateCatalogInput,
} from './catalogs.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatalogsService {
  constructor(
    @InjectModel(Catalog.name) private model: Model<CatalogDocument>,
  ) {}

  async getCatalogs(): Promise<Catalog[]> {
    return await this.model.find();
  }

  async getCatalogById(id: string): Promise<Catalog> {
    return await this.model.findById(id);
  }

  async createCatalog(input: CreateCatalogInput): Promise<Catalog> {
    const catalog = new this.model(input);
    catalog.save();
    return catalog;
  }
}
