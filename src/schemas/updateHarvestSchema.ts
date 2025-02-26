import { z } from 'zod';

export const updateHarvestSchema = z.object({
	year: z.string().optional(),
	crop: z.string().array().optional(),
});
