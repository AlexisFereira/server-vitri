import { Test, TestingModule } from '@nestjs/testing';
import { CategoryListResolver } from './category-list.resolver';
import { CategoryListService } from './category-list.service';

describe('CategoryListResolver', () => {
  let resolver: CategoryListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryListResolver, CategoryListService],
    }).compile();

    resolver = module.get<CategoryListResolver>(CategoryListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
