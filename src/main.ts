import { ConfigService } from '@nestjs/config';
import { createApp } from './bootstrap';

async function bootstrap(): Promise<void> {
	const app = await createApp();
	const configService = app.get(ConfigService);
	const port = configService.get('PORT');

	await app.listen(port);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
