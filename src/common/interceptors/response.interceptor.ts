/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-18 02:00:51
 * @LastEditTime: 2023-07-18 02:17:33
 * @LastEditors: 
 * @FilePath: \nest-service\src\common\interceptors\response.interceptor.ts
 */
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { WinstonLogger } from '../config/winston.logger';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  constructor(private readonly winstonLogger: WinstonLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        const responseTime = Date.now() - now;

        const logMessage = `${method} ${url} ${statusCode} ${responseTime}ms`;

        if (statusCode >= 500) {
          this.logger.error(logMessage);
        } else if (statusCode >= 400) {
          this.logger.warn(logMessage);
        } else {
          this.logger.log(logMessage);
        }

        this.winstonLogger.log(logMessage);
      }),
    );
  }
}
