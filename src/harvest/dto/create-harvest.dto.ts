import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Harvest } from '../entities/harvest.entity';

export class CreateHarvestDto extends PartialType(Harvest) {
	@ApiProperty({
		example: 2025,
		description: 'Ano da safra.',
	})
	year: string;
}
