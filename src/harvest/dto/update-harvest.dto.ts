import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateHarvestDto } from './create-harvest.dto';

export class UpdateHarvestDto extends PartialType(CreateHarvestDto) {
	@ApiPropertyOptional({
		example: 2025,
		description: 'Ano da safra.',
	})
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	year?: string;

	@ApiPropertyOptional({
		examples: ['Arroz', 'Soja'],
	})
	@IsString({ each: true })
	@IsArray()
	@IsNotEmpty({ each: true })
	@IsOptional()
	crop?: string[];
}
