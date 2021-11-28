import { Module } from '@nestjs/common';
import { DisponibilitiesService } from './disponibilities.service';
import { DisponibilitiesController } from './disponibilities.controller';

@Module({
  controllers: [DisponibilitiesController],
  providers: [DisponibilitiesService]
})
export class DisponibilitiesModule {}
