import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response {
  ok: boolean;
  error?: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map(() => ({
        ok: true,
      })),
      catchError((err) => {
        return of({
          ok: false,
          error: (
            (err as BadRequestException).getResponse() as any
          ).message.join(' '),
        });
      }),
    );
  }
}
