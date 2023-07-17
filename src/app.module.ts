/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-14 01:08:26
 * @LastEditTime: 2023-07-18 02:18:57
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\app.module.ts
 */
import { Logger, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerModule } from './modules/logger/logger.module';
import { WinstonLogger } from './common/config/winston.logger';
import { PrismaClient } from '@prisma/client';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Module({
  imports: [UserModule, RoleModule, MenuModule, PrismaModule, LoggerModule],
  controllers: [],
  providers: [
    // {
    //   provide: Logger,
    //   useClass: WinstonLogger,
    // },
    PrismaClient,
    WinstonLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [PrismaClient, WinstonLogger],
})
export class AppModule {}
