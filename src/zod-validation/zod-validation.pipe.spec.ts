import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
	it('should be defined', () => {
		const schema = z.object({ name: z.string() });

		expect(new ZodValidationPipe(schema)).toBeDefined();
	});

	it('should be validate schema when value is valid', () => {
		const schema = z.object({ name: z.string() });
		const pipe = new ZodValidationPipe(schema);
		const value = { name: 'Jorge Jesus' };

		expect(pipe.transform(value, { type: 'body' })).toEqual(value);
	});

	it('should to throw BadRequestException when is invalid', () => {
		const schema = z.object({ name: z.string() });
		const pipe = new ZodValidationPipe(schema);
		const value = { name: 123 };

		expect(() => pipe.transform(value, { type: 'body' })).toThrow(
			BadRequestException,
		);
	});
});
