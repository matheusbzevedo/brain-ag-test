import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private readonly schema: ZodSchema) {}

	transform(value: unknown, _metadata: ArgumentMetadata) {
		try {
			const parsedValue = this.schema.parse(value);

			return parsedValue;
		} catch (error) {
			throw new BadRequestException(error);
		}
	}
}
