import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRuralProducerDto } from './create-rural-producer.dto';

export class UpdateRuralProducerDto extends PartialType(
	OmitType(CreateRuralProducerDto, ['cpfCnpj']),
) {}
