import { z } from 'zod';
import { cpfCnpjSchema } from './cpf-cnpj-schema';

export const createRuralProducerSchema = z.object({
	name: z.string(),
	cpfCnpj: cpfCnpjSchema,
});
