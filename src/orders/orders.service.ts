import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { productId, quantity, totalPrice } = createOrderDto;
      const product = await this.productRepository.findOne({ where: { id: productId } });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const order = this.orderRepository.create({
        product,
        quantity,
        totalPrice,
      });

      await this.orderRepository.save(order);

      return {
        message: 'Order created successfully',
        order,
      }
    } catch (error) {
      return {
        message: 'Ocorreu um erro!',
        error,
      }
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'product',
        // 'customer', <-- Uncomment this line after
        // creating the User entity
      ],
    });
    return {
      orders
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
