import {
	ValidationArguments,
	ValidationOptions,
	registerDecorator,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
	return (object: Record<string, any>, propertyName: string) => {
		registerDecorator({
			name: 'isCpfOrCnpj',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, _args: ValidationArguments) {
					return (
						typeof value === 'string' &&
						(cpf.isValid(value) || cnpj.isValid(value))
					);
				},
				defaultMessage(_args: ValidationArguments) {
					return 'O valor fornecido deve ser um CPF ou CNPJ válido.';
				},
			},
		});
	};
}
