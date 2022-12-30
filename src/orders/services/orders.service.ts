import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.services';
import { ApiResponseDTO } from 'src/core/dtos';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
  OrderDTO,
  UpdateOrderStatusDTO,
} from '../dtos';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  //create new --------
  async create(createOrderDTO: CreateOrderDTO): Promise<ApiResponseDTO<any>> {
    try {
      console.log(createOrderDTO);
      const createdOrder = await this.prismaService.userOrders.create({
        data: {
          ...createOrderDTO,
        },
      });

      return {
        status: 'success',
        data: new OrderDTO(createdOrder),
        message: 'The Order Orders has been successfully created.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  // find all--------
  async findAll(): Promise<any> {
    try {
      const totalCount = await this.prismaService.userOrders.count({});
      if (totalCount === 0) {
        return {
          status: 'success',
          data: null,
          message: 'No user found.',
        };
      }

      const orders = await this.prismaService.userOrders.findMany({});

      return {
        status: 'success',
        data: orders,
        message: ' Orders retrieve successful.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //find one ------
  async findOne(id: any): Promise<any> {
    try {
      const order = await this.prismaService.userOrders.findUnique({
        where: {
          id: id,
        },
      });

      if (order === null) {
        return {
          status: 'success',
          data: null,
          message: 'No orders found.',
        };
      }
      return {
        status: 'success',
        data: order,
        message: ' Order retrieve successful.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //update ----------
  async update(
    id: any,
    updateOrderDTO: UpdateOrderDTO,
  ): Promise<ApiResponseDTO<OrderDTO>> {
    try {
      const updatedOrderData = await this.prismaService.userOrders.update({
        where: {
          id: id,
        },
        data: {
          ...updateOrderDTO,
        },
      });
      return {
        status: 'success',
        data: updatedOrderData,
        message: 'Order info has been updated.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //status update ----------
  async updateStatus(
    id: any,
    updateOrderStatusDTO: UpdateOrderStatusDTO,
  ): Promise<ApiResponseDTO<OrderDTO>> {
    try {
      const updatedOrderData = await this.prismaService.userOrders.update({
        where: {
          id: id,
        },
        data: {
          ...updateOrderStatusDTO,
        },
      });
      return {
        status: 'success',
        data: new OrderDTO(updatedOrderData),
        message: 'Order Orders status has been updated.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //remove
  async remove(id: any) {
    try {
      return await this.prismaService.userOrders.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}
