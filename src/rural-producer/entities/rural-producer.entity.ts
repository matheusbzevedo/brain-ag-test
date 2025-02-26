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
		example: 'Fazenda do Flamengo',
		description: 'Nome da fazenda.',
	})
	farmName: string;

	@ApiProperty({
		example: 'Rio de Janeiro',
		description: 'Cidade onde a fazenda está situada.',
	})
	city: string;

	@ApiProperty({
		example: 'Rio de Janeiro',
		description: 'Estado onde a fazenda está situada.',
	})
	state: string;

	@ApiProperty({
		example: 100,
		description: 'Área total da fazenda em hectares',
	})
	totalAreaFarm: number;
}
