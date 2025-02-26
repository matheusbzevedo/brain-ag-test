import { RuralProducer } from '@/rural-producer/entities/rural-producer.entity';
import { PickType } from '@nestjs/swagger';

export class CreateRuralProducerDto extends PickType(RuralProducer, [
	'cpfCnpj',
	'name',
] as const) {}
