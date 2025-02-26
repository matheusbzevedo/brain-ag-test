import { cnpj, cpf } from 'cpf-cnpj-validator';
import { z } from 'zod';

export const cpfCnpjSchema = z
	.string()
	.refine((value): boolean => cpf.isValid(value) || cnpj.isValid(value), {
		message: 'CPF ou CNPJ inválido.',
	});
