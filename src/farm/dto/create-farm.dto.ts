import { AreasSumConstraint } from '@/validators/AreasSumContraint';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	Validate,
} from 'class-validator';
import { Farm } from '../entities/farm.entity';

export class CreateFarmDto extends OmitType(Farm, ['id', 'haversts']) {
	@ApiProperty({ example: 100 })
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	arebleArea: number;

	@ApiProperty({ example: 'Curitiba' })
	@IsString()
	@IsNotEmpty()
	city: string;

	@ApiProperty({ example: 'João da Silva' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ example: 'Curitiba' })
	@IsString()
	@IsNotEmpty()
	state: string;

	@ApiProperty({ example: 100 })
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	totalArea: number;

	@ApiProperty({ example: 100 })
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	vegetationArea: number;

	@Validate(AreasSumConstraint)
	validateArea?: boolean;
}
