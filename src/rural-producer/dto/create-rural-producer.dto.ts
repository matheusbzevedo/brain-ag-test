import { RuralProducer } from '@/rural-producer/entities/rural-producer.entity';
import { PickType } from '@nestjs/swagger';
import { IsCpfCnpj } from 'src/validators/is-cpf-cnpj';

export class CreateRuralProducerDto extends PickType(RuralProducer, [
	'name',
] as const) {
	@IsCpfCnpj({ message: 'O CPF ou CNPJ informado não é válido' })
	cpfCnpj: string;
}
