import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongoModule } from './databases/mongo.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './exceptions/transform.interceptor';

@Module({
  imports: [
    MongoModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
  },
  ],
})
export class AppModule {}
