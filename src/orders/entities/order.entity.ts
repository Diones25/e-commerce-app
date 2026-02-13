import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  CANCELED = 'CANCELED',
}

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  // @ManyToOne(() => User, (user) => user.orders)
  // customer: User;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  totalPrice: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @Column(
    {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP'
    }
  )
  createdAt: Date;
}
