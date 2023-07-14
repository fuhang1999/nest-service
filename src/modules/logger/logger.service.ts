import { Injectable } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';

@Injectable()
export class LoggerService {
  create(createLoggerDto: CreateLoggerDto) {
    return 'This action adds a new logger';
  }

  findAll() {
    return `This action returns all logger`;
  }
}
