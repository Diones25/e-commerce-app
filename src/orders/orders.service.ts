import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

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
        throw new NotFoundException('Produto não encontrado');
      }

      const order = this.orderRepository.create({
        product,
        quantity,
        totalPrice,
      });

      await this.orderRepository.save(order);

      return {
        message: 'Pedido criado com sucesso',
        order,
      }
    } catch (error) {
      return {
        message: 'Ocorreu um erro!',
        error,
      }
    }
  }

  async getOrders(page: number = 1, limit: number = 10) {
    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'product',
        // 'customer', <-- Uncomment this line after
        // creating the User entity
      ],
      select: {
        product: {
          name: true,
          price: true,
          image: true
        }
      }
    });
    return {
      orders
    }
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        'product',
        // 'customer', <-- Uncomment this line after
        // creating the User entity
      ]
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return {
      order,
    };
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `Atualizando o pedido #${id}`;
  }

  remove(id: string) {
    return `Removendo o pedido #${id}`;
  }
}
