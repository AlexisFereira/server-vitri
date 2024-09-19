import { Test, TestingModule } from '@nestjs/testing';
import { CommerceListService } from './commerce-list.service';

describe('CommerceListService', () => {
  let service: CommerceListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommerceListService],
    }).compile();

    service = module.get<CommerceListService>(CommerceListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
