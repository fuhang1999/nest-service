/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-14 02:06:22
 * @LastEditTime: 2023-07-14 02:38:00
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\prisma\prisma.module.ts
 */
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
