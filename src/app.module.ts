import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongoModule } from './databases/mongo.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './exceptions/transform.interceptor';
import { UserModule } from './modules/user/user.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

@Module({
  imports: [
    MongoModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      scope:Scope.REQUEST,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
  },
  ],
})
export class AppModule {}
