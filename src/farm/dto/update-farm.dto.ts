import { PartialType } from '@nestjs/swagger';
import { CreateFarmDto } from './create-farm.dto';

export class UpdateFarmDto extends PartialType(CreateFarmDto) {
	arebleArea?: number | undefined;
	city?: string | undefined;
	name?: string | undefined;
	state?: string | undefined;
	totalArea?: number | undefined;
	vegetationArea?: number | undefined;
}
