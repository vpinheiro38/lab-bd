import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilitiesController } from './disponibilities.controller';
import { DisponibilitiesService } from './disponibilities.service';

describe('DisponibilitiesController', () => {
  let controller: DisponibilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisponibilitiesController],
      providers: [DisponibilitiesService],
    }).compile();

    controller = module.get<DisponibilitiesController>(DisponibilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
