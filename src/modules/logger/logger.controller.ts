/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-17 01:17:30
 * @LastEditTime: 2023-07-17 01:36:05
 * @LastEditors: 
 * @FilePath: \nest-service\src\modules\logger\logger.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  create(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggerService.create(createLoggerDto);
  }
}
