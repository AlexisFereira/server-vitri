import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryListService } from './category-list.service';
import { Category, CreateCategoryInput } from './category-list.schema';

@Resolver()
export class CategoryListResolver {
  constructor(private readonly categoryListService: CategoryListService) {}

  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return await this.categoryListService.getCategories();
  }

  @Query(() => Category)
  async getCategoryById(@Args('categoryId') id: string): Promise<Category> {
    return await this.categoryListService.getCategoryById(id);
  }

  @Mutation(() => Category)
  async createCategory(input: CreateCategoryInput): Promise<Category> {
    return await this.categoryListService.createCategory(input);
  }
}
