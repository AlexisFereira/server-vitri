import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatalogsService } from './catalogs.service';
import { Catalog, CreateCatalogInput } from './catalogs.schema';

@Resolver('Catalogs')
export class CatalogsResolver {
  constructor(private readonly catalogService: CatalogsService) {}

  @Query(() => [Catalog])
  async getCatalogs(): Promise<Catalog[]> {
    return await this.catalogService.getCatalogs();
  }

  @Query(() => [Catalog])
  async getCatalogById(@Args('catalogId') id: string): Promise<Catalog> {
    return await this.catalogService.getCatalogById(id);
  }

  @Mutation(() => [Catalog])
  async createCatalog(
    @Args('catalogId') input: CreateCatalogInput,
  ): Promise<Catalog> {
    return await this.catalogService.createCatalog(input);
  }
}
