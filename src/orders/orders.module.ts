import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { CommonModule } from '../common/common.module';
import { PaginationService } from '../common/pagination/pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product]),
    CommonModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaginationService],
})
export class OrdersModule { }
