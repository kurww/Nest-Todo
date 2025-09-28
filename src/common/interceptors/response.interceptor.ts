import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 200,
          message: 'Success',
          validation: null,
          data: this.excludeTimestamps(data),
        };
      }),
    );
  }

  private excludeTimestamps(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.excludeTimestamps(item));
    }
    if (data && typeof data === 'object' && data.constructor === Object) {
      const { createdAt, updatedAt, ...rest } = data;
      return Object.keys(rest).reduce((acc, key) => {
        acc[key] = this.excludeTimestamps(rest[key]);
        return acc;
      }, {});
    }
    return data;
  }
}
