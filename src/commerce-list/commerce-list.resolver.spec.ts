import { Test, TestingModule } from '@nestjs/testing';
import { CommerceListResolver } from './commerce-list.resolver';
import { CommerceListService } from './commerce-list.service';

describe('CommerceListResolver', () => {
  let resolver: CommerceListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommerceListResolver, CommerceListService],
    }).compile();

    resolver = module.get<CommerceListResolver>(CommerceListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
