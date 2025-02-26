import { Harvest } from '@/haverst/entities/harvest.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Farm {
	@ApiProperty({ description: 'Identificador único da propriedade rural.' })
	id: number;

	@ApiProperty({
		example: 'Recanto do Flamengo',
		description: 'Nome da fazenda',
	})
	name: string;

	@ApiProperty({
		example: 'Rio de Janeiro',
		description: 'Cidade onde a propriedade está situada.',
	})
	city: string;

	@ApiProperty({
		example: 'Rio de Janeiro',
		description: 'Estado onde a propriedade está situada.',
	})
	state: string;

	@ApiProperty({
		example: 100,
		description: 'Área total da fazenda em hectares.',
	})
	totalArea: number;

	@ApiProperty({
		example: 50,
		description: 'Área agricultável em hectares.',
	})
	arebleArea: number;

	@ApiProperty({
		example: 50,
		description: 'Área de vegetação em hectares.',
	})
	vegetationArea: number;

	@ApiProperty({
		description: 'Safras',
		isArray: true,
		nullable: true,
	})
	haversts?: Harvest[];
}
