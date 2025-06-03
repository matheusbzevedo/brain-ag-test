import { RuralProducer } from '@/rural-producer/entities/rural-producer.entity';
import { IsCpfOrCnpj } from '@/validators/IsCpfOrCnpj';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRuralProducerDto extends PickType(RuralProducer, [
	'cpfCnpj',
	'name',
] as const) {
	@ApiProperty({
		example: '12345678901',
		description: 'CPF ou CNPJ do produtor rural',
	})
	@IsCpfOrCnpj()
	@IsNotEmpty()
	cpfCnpj: string;

	@ApiProperty({
		example: 'João da Silva',
		description: 'Nome do produtor rural',
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}
