import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { PositionsModule } from './positions/positions.module';
import { ProductsModule } from './products/products.module';

const TransformInterceptorService = {
  provide: APP_INTERCEPTOR,
  useClass: TransformInterceptor,
};

@Module({
  imports: [ProductsModule, PositionsModule],
  providers: [TransformInterceptorService, AppService],
  controllers: [AppController],
})
export class AppModule {}
