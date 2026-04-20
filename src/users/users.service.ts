import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly paginationService: PaginationService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Usuário já existe');
      }
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const users = await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
      relations: ['orders'],
    });

    const totalItems = await this.userRepository.count();
    const meta = this.paginationService.getPaginationMeta(page, limit, totalItems);
    return {
      users,
      meta,
    }
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['orders'],
    });
    if (!user) {
      throw new NotFoundException(`Usuário com username ${username} não encontrado`);
    }
    return user;
  }
}
