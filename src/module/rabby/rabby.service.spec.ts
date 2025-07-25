import { Test, TestingModule } from '@nestjs/testing';
import { RabbyService } from './rabby.service';

describe('RabbyService', () => {
  let service: RabbyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbyService],
    }).compile();

    service = module.get<RabbyService>(RabbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
