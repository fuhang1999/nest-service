/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-17 01:17:30
 * @LastEditTime: 2023-07-18 02:14:04
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\logger\logger.service.ts
 */
import { Inject, Injectable, Logger as NestLogger } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';
import { Logger } from './entities/logger.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../prisma/prisma.service';
import { WinstonLogger } from '@/common/config/winston.logger';

@Injectable()
export class LoggerService {
  private readonly logger = new WinstonLogger()

  constructor(
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prisma: PrismaService,
  ) {}
  
  async create(params: any): Promise<Logger> {
    // const log: Logger = { level, message };
    // return params;
    // console.log('params', params, LoggerService.name);
    // this.logger.debug(LoggerService.name); 
    return this.prisma.log.create({
      data: params,
    });
  }
}
