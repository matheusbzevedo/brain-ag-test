import { ApiProperty } from '@nestjs/swagger';

export class Harvest {
	@ApiProperty({
		example: 2025,
		description: 'Ano da safra.',
	})
	year: string;

	@ApiProperty({
		example: ['Café', 'Soja'],
		description: 'Cultura plantada.',
		isArray: true,
		nullable: true,
	})
	crop?: string[];
}
