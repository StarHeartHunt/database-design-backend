import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { PositionsModule } from './positions/positions.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const TransformInterceptorService = {
  provide: APP_INTERCEPTOR,
  useClass: TransformInterceptor,
};
const AuthGuardService = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    PositionsModule,
    ProductTypesModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AuthGuardService, TransformInterceptorService, AppService],
  controllers: [AppController],
})
export class AppModule {}
