import { OmitType } from '@nestjs/swagger';
import { Farm } from '../entities/farm.entity';

export class CreateFarmDto extends OmitType(Farm, ['id', 'haversts']) {}
