import { Inject, Injectable } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';
import { Logger } from './entities/logger.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prisma: PrismaService,
  ) {}
  
  async create(params: any): Promise<Logger> {
    // const log: Logger = { level, message };
    // return params;
    console.log('params', params);
    
    return this.prisma.log.create({
      data: params,
    });
  }
}
