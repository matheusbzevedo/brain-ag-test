import {
	ValidationOptions,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export class IsCpfCnpjConstraint implements ValidatorConstraintInterface {
	validate(value: string): boolean {
		if (!value) {
			return false;
		}

		return cpf.isValid(value) || cnpj.isValid(value);
	}

	defaultMessage(): string {
		return 'CPF ou CNPJ inválido';
	}
}

export function IsCpfCnpj(validationsOptions?: ValidationOptions) {
	return (object: Object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationsOptions,
			constraints: [],
			validator: IsCpfCnpjConstraint,
		});
	};
}
