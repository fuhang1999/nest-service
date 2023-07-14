/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-14 03:03:56
 * @LastEditTime: 2023-07-14 03:11:55
 * @LastEditors: 
 * @FilePath: \nest-service\src\common\config\winston\winston-logger.service.ts
 */
// winston-logger.service.ts
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { LoggerService as LoggerRecordService } from '@/modules/logger/logger.service';
import { Logger, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly logger: Logger;

  constructor(private readonly loggerRecordService: LoggerRecordService) {
    const transportConsole = new transports.Console();
    const transportFile = new DailyRotateFile({
      dirname: 'logs',
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    this.logger = new Logger({
      transports: [transportConsole, transportFile],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
    this.storeLogInDatabase('info', message, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
    this.storeLogInDatabase('warn', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
    this.storeLogInDatabase('error', message, context);
  }

  private storeLogInDatabase(level: string, message: string, context?: string) {
    this.loggerRecordService.create({
      data: {
        level,
        message,
        context,
      },
    });
  }
}
