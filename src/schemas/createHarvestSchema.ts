import { z } from 'zod';

export const createHarvestSchema = z.object({
	year: z.string(),
	crop: z.string().array().optional(),
});
