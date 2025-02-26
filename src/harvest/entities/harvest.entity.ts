import { ApiProperty } from '@nestjs/swagger';

export class Harvest {
	@ApiProperty({
		description: 'Idenficador único da safra.',
	})
	id: number;

	@ApiProperty({
		example: 2025,
		description: 'Ano da safra.',
	})
	year: Date;

	@ApiProperty({
		example: ['Café', 'Soja'],
		description: 'Cultura plantada.',
		isArray: true,
	})
	crop: string[];
}
