import { z } from 'zod';

export const createFarmSchema = z.object({
	name: z.string(),
	city: z.string(),
	state: z.string(),
	totalArea: z.number().positive(),
	arebleArea: z.number().positive(),
	vegetationArea: z.number().positive(),
});
