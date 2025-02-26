import { z } from 'zod';

export const createUpdateFarmSchema = z
	.object({
		name: z.string(),
		city: z.string(),
		state: z.string(),
		totalArea: z.number().positive(),
		arebleArea: z.number().positive(),
		vegetationArea: z.number().positive(),
	})
	.refine(
		(data): boolean => data.arebleArea + data.vegetationArea <= data.totalArea,
		{
			message:
				'A soma da área agricultável e área de vegetação não pode ser maior que área total',
			path: ['arebleArea', 'vegetationArea'],
		},
	);
