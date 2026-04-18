import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    private readonly paginationService: PaginationService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    await this.productsRepository.save(product);
    return {
      message: 'Produto criado com sucesso',
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

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return {
      product,
    };
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `Atualizando o produto #${id}`;
  }

  remove(id: string) {
    return `Removendo o produto #${id}`;
  }
}
