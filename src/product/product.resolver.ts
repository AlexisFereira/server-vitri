import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput, Product } from './product.schema';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Query(() => Product)
  async getProductById(@Args('productId') id: string): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('productInput') input: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.createProduct(input);
  }
}
