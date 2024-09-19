import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommerceListService } from './commerce-list.service';
import {
  CommerceList,
  CreateCommerceListItem,
  CreateManyCommerceListItem,
} from './commerce-list.schema';

@Resolver('CommerceList')
export class CommerceListResolver {
  constructor(private readonly commerceListService: CommerceListService) {}

  @Query(() => [CommerceList])
  async getCommerceList(): Promise<CommerceList[]> {
    return await this.commerceListService.getCommerceList();
  }

  @Query(() => CommerceList)
  async getCommerceItem(@Args('commerceId') id: string): Promise<CommerceList> {
    return await this.commerceListService.getCommerceItemById(id);
  }

  @Mutation(() => CommerceList)
  async createCommerceListItem(
    @Args('commerceName') input: CreateCommerceListItem,
  ): Promise<CommerceList> {
    return await this.commerceListService.createCommerceItem(input);
  }

  @Mutation(() => [CommerceList])
  async createCommerceItems(
    @Args('commerceNames') input: CreateManyCommerceListItem,
  ): Promise<CommerceList[]> {
    return await this.commerceListService.createCommerceItems(input);
  }
}
