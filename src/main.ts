/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-14 01:08:26
 * @LastEditTime: 2023-07-14 03:35:55
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // 设置swagger文档相关配置
  const config = new DocumentBuilder()
    .setTitle('Naive Admin 后台管理系统接口文档')
    .setDescription('后台管理系统接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();