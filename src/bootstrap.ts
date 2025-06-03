import { AllExceptionsFilter } from '@/filters/all-exception';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	DocumentBuilder,
	type OpenAPIObject,
	SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

export async function createApp() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
	});
	app.use(helmet());
	app.useGlobalPipes(
		new ValidationPipe({
			forbidNonWhitelisted: true,
			transform: true,
			whitelist: true,
		}),
	);
	app.useGlobalFilters(new AllExceptionsFilter());
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	const config = new DocumentBuilder()
		.setTitle('Brain Ag API')
		.setDescription('Test for developer mid-level Brain Ag')
		.setVersion('1.0')
		.build();

	const documentFactory = (): OpenAPIObject =>
		SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);

	return app;
}
