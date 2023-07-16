/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-14 03:03:56
 * @LastEditTime: 2023-07-17 01:52:05
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\config\winston.logger.ts
 */
import { LoggerOptions, transports, createLogger } from 'winston';
import { format } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const loggerOptions: LoggerOptions = {
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m', // 每个日志文件的最大大小
      maxFiles: '14d', // 保存14天的日志文件
    }),
  ],
};
