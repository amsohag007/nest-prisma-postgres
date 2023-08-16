import { Module } from '@nestjs/common';
import { OrdersController } from './controllers';
import { OrdersService } from './services';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
