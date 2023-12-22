import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  mixin,
} from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Response<T> {
  data: T;
}

type Constructor<T = unknown> = new (...args: any[]) => T;

export function withBaseResponse<TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions | undefined,
) {
  class ResponseDTO {
    @ApiProperty({
      isArray: true,
      type: Base,
      ...options,
    })
    data!: Array<InstanceType<TBase>>;
  }
  return mixin(ResponseDTO);
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
