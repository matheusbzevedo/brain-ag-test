import { RuralProducer } from '@/rural-producer/entities/rural-producer.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateRuralProducerDto extends PickType(RuralProducer, [
	'name',
] as const) {
	@ApiProperty({
		required: true,
		description: 'CPF ou CNPJ',
	})
	cpfCnpj: string;
}
