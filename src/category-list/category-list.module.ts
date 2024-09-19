import { Module } from '@nestjs/common';
import { CategoryListService } from './category-list.service';
import { CategoryListResolver } from './category-list.resolver';
import { Category, CategorySchema } from './category-list.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryListResolver, CategoryListService],
})
export class CategoryListModule {}
