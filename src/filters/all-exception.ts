import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message =
			exception instanceof HttpException
				? exception.getResponse()
				: 'Erro interno no servidor';

		response.status(status).json({
			message: this.extractMessage(message),
			path: request.url,
			timestamp: new Date().toISOString(),
		});
	}

	private extractMessage(error: unknown): string {
		if (typeof error === 'string') {
			return error;
		}

		if (error && typeof error === 'object' && 'message' in error) {
			const value = (error as Record<string, unknown>).message;
			if (typeof value === 'string') {
				return value;
			}
			if (Array.isArray(value)) {
				return value.join(', ');
			}
		}

		return 'Erro inesperado';
	}
}
