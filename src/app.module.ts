import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// todo: adicionar o usuário e senha do banco de dados em variáveis de ambiente 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'ecommerce_db',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
