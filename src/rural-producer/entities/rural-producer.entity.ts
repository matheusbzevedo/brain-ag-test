import { Farm } from '@/farm/entities/farm.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RuralProducer {
	@ApiProperty({
		example: '99999999999',
		description: 'CPF ou CNPJ do produtor.',
	})
	cpfCnpj: string;

	@ApiProperty({
		example: 'Jorge Jesus',
		description: 'Nome do produtor.',
	})
	name: string;

	@ApiProperty({
		description: 'Propriedades rurais.',
		type: Farm,
		isArray: true,
		nullable: true,
	})
	farm?: Farm[];
}
