/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-14 02:06:22
 * @LastEditTime: 2023-07-17 01:41:06
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\prisma\prisma.service.ts
 */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
