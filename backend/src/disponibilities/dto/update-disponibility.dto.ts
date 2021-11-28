import { PartialType } from '@nestjs/mapped-types';
import { CreateDisponibilityDto } from './create-disponibility.dto';

export class UpdateDisponibilityDto extends PartialType(CreateDisponibilityDto) {
    routine_id:string;
    day_id:string;
    disponibility_morning:string;
    disponibility_afternoon:string;
    disponibility_night:string;
}
