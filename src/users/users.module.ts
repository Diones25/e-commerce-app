import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService, PaginationService],
  exports: [UsersService]
})
export class UsersModule {}
