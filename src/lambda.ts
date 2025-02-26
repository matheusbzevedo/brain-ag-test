import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { createApp } from './bootstrap';

let server: Handler;

async function bootstrap(): Promise<Handler> {
	const app = await createApp();
	await app.init();

	const expressApp = app.getHttpAdapter().getInstance();
	return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
	event: unknown,
	context: Context,
	callback: Callback,
): Promise<unknown> => {
	server = server ?? (await bootstrap());
	return server(event, context, callback);
};
