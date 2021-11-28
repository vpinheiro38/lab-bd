import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilitiesService } from './disponibilities.service';

describe('DisponibilitiesService', () => {
  let service: DisponibilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisponibilitiesService],
    }).compile();

    service = module.get<DisponibilitiesService>(DisponibilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
