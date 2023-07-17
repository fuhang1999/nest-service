// /*
//  * @Description:
//  * @Author: FuHang
//  * @Date: 2023-07-14 03:03:56
//  * @LastEditTime: 2023-07-18 00:25:12
//  * @LastEditors: Please set LastEditors
//  * @FilePath: \nest-service\src\common\config\winston.logger.ts
//  */
// import { LoggerOptions, transports, format } from 'winston';
// import 'winston-daily-rotate-file';

// const { combine, timestamp, printf } = format;

// const myFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} ${level}: ${message}`;
// });

// export const loggerOptions: LoggerOptions = {
//   format: combine(timestamp(), myFormat),
//   transports: [
//     new transports.Console(),
//     // new transports.DailyRotateFile({
//     //   dirname: 'logs',
//     //   filename: 'application-%DATE%.log',
//     //   datePattern: 'YYYY-MM-DD',
//     //   zippedArchive: true,
//     //   maxSize: '20m', // 每个日志文件的最大大小
//     //   maxFiles: '14d', // 保存14天的日志文件
//     // }),
//     new transports.DailyRotateFile({
//       level: 'error',
//       dirname: `logs/error`, // 日志保存的目录
//       filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
//       datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
//       zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
//       maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
//       maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
//       // 记录时添加时间戳信息
//       format: format.combine(
//         format.timestamp({
//           format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         format.json(),
//       ),
//     }),
//     // 中间件 middleware 记录
//     new transports.DailyRotateFile({
//       level: 'debug',
//       dirname: `logs/debug`, // 日志保存的目录
//       filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
//       datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
//       zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
//       maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
//       maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
//       // 记录时添加时间戳信息
//       format: format.combine(
//         format.timestamp({
//           format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         format.json(),
//       ),
//     }),
//     // HTTP 请求记录
//     new transports.DailyRotateFile({
//       level: 'info',
//       dirname: `logs/info`, // 日志保存的目录
//       filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
//       datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
//       zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
//       maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
//       maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
//       // 记录时添加时间戳信息
//       format: format.combine(
//         format.timestamp({
//           format: 'YYYY-MM-DD HH:mm:ss',
//         }),
//         format.json(),
//       ),
//     }),
//   ],
// };

import { Logger, LoggerService } from '@nestjs/common';
// import * as winston from 'winston';
import { LoggerOptions, transports, format, createLogger } from 'winston';
import 'winston-daily-rotate-file';

export class WinstonLogger implements LoggerService {
  private customLogger: Logger | any;
  private logger: Logger;

  constructor() {
    const logFormat = format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}] - ${message}`;
      }),
    );

    this.customLogger = createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        // 添加控制台输出
        new transports.Console({
          format: format.simple(),
        }),
        new transports.DailyRotateFile({
          level: 'error',
          dirname: `logs/error`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.json(),
          ),
        }),
        // 中间件 middleware 记录
        new transports.DailyRotateFile({
          level: 'debug',
          dirname: `logs/debug`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.json(),
          ),
        }),
        // HTTP 请求记录
        new transports.DailyRotateFile({
          level: 'info',
          dirname: `logs/info`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: format.combine(
            format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.json(),
          ),
        }),
      ],
    });

    this.logger = new Logger(WinstonLogger.name)
  }

  log(message: string) {
    this.customLogger.info(message);
    this.logger.log(message);
  }

  error(message: string, trace: string) {
    this.customLogger.error(message, trace);
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.customLogger.warn(message);
    this.logger.warn(message);
  }

  debug(message: string) {
    this.customLogger.debug(message);
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.customLogger.verbose(message);
    this.logger.verbose(message);
  }
}
