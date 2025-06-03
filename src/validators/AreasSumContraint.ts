import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'AreasSumConstraint', async: false })
export class AreasSumConstraint implements ValidatorConstraintInterface {
	validate(_value: any, validationArguments?: ValidationArguments) {
		const { totalArea, arebleArea, vegetationArea } =
			validationArguments?.object as any;

		return arebleArea + vegetationArea <= totalArea;
	}
	defaultMessage(_validationArguments?: ValidationArguments): string {
		return 'A soma da área agricultável e área de vegetação não pode ser maior que a área total.';
	}
}
