import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    await this.productsRepository.save(product);
    return {
      message: 'Product created successfully',
      product,
    }
  }

  async findAll(page = 1, limit = 10) {
    const products = await this.productsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      products,
    }
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    return {
      product,
    };
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
