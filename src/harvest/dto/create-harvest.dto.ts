import { OmitType } from '@nestjs/swagger';
import { Harvest } from '../entities/harvest.entity';

export class CreateHarvestDto extends OmitType(Harvest, ['id']) {}
