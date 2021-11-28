import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DisponibilitiesService } from './disponibilities.service';
import { CreateDisponibilityDto } from './dto/create-disponibility.dto';
import { UpdateDisponibilityDto } from './dto/update-disponibility.dto';

@Controller('disponibilities')
export class DisponibilitiesController {
  constructor(private readonly disponibilitiesService: DisponibilitiesService) {}

  @Post()
  create(@Body() createDisponibilityDto: CreateDisponibilityDto) {
    return this.disponibilitiesService.create(createDisponibilityDto);
  }

  @Get()
  findAll() {
    return this.disponibilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disponibilitiesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDisponibilityDto: UpdateDisponibilityDto) {
    return this.disponibilitiesService.update(+id, updateDisponibilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disponibilitiesService.remove(+id);
  }
}
