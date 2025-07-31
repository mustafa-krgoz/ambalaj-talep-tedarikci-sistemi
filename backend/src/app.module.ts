import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { User } from './user/entities/user.entity';
import { ProductType } from './product-type/entities/product-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'order_tracking_db',
      entities: [User, ProductType],
      synchronize: true, // gelişim sürecinde true, prod'da false 
    }),
    UserModule,
    ProductTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}