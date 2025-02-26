import { z } from 'zod';

export const updateRuralProducerSchema = z.object({
	name: z.string(),
});
