import { RuralProducer } from '@/rural-producer/entities/rural-producer.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsCpfCnpj } from 'src/validators/is-cpf-cnpj';

export class CreateRuralProducerDto extends PickType(RuralProducer, [
	'name',
] as const) {
	@ApiProperty({
		required: true,
		description: 'CPF ou CNPJ',
	})
	@IsCpfCnpj({ message: 'O CPF ou CNPJ informado não é válido' })
	cpfCnpj: string;
}
