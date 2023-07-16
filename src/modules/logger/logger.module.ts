import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from '@/common/config/winston.logger';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    WinstonModule.forRoot(loggerOptions),
  ],
  controllers: [LoggerController],
  providers: [LoggerService, PrismaService],
  exports: [WinstonModule],
})
export class LoggerModule {}
