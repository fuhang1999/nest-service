import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [UserModule, RoleModule, MenuModule, PrismaModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
