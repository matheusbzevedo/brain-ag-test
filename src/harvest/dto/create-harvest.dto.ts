import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Harvest } from '../entities/harvest.entity';

export class CreateHarvestDto extends PartialType(Harvest) {
	@ApiProperty({
		example: 2025,
		description: 'Ano da safra.',
	})
	@IsString()
	@IsNotEmpty()
	year: string;

	@ApiPropertyOptional({
		examples: ['Arroz', 'Soja'],
	})
	@IsString({ each: true })
	@IsArray()
	@IsNotEmpty({ each: true })
	@IsOptional()
	crop?: string[];
}
