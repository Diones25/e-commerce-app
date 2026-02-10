import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async () => {
        const configService = new ConfigService();
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: parseInt(configService.get('POSTGRES_PORT') || '5432'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migrations',
          },
        }
      }
    }),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
