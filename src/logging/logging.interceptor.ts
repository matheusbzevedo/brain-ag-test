import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest();

		if (!request) {
			return next.handle();
		}

		const { method, url, body } = request;

		console.log(`Incoming Request: ${method} ${url}`, body || '');

		return next.handle().pipe(
			tap((): void => {
				console.log(`Completed Request: ${method} ${url}`);
			}),
		);
	}
}
