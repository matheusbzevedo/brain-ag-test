import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRuralProducerDto } from './create-rural-producer.dto';

export class UpdateRuralProducerDto extends PartialType(
	OmitType(CreateRuralProducerDto, ['cpfCnpj']),
) {
	@ApiPropertyOptional({ example: 'João da Silva' })
	@IsNotEmpty()
	@IsString()
	name?: string;
}
