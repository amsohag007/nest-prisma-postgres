import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import {
  OrderDTO,
  CreateOrderDTO,
  UpdateOrderDTO,
  UpdateOrderStatusDTO,
} from 'src/orders/dtos';
import { OrdersService } from 'src/orders/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from 'src/core/dtos';

@Controller('orders')
@ApiBearerAuth('JWT')
@ApiTags('Order API')
export class OrdersController {
  constructor(private orderServices: OrdersService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new order.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: OrderDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateOrderDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createOrderDTO: CreateOrderDTO,
  ): Promise<ApiResponseDTO<OrderDTO>> {
    return await this.orderServices.create(createOrderDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all orders.' })
  @ApiOkResponse({
    type: OrderDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<OrderDTO>> {
    return await this.orderServices.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get order by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a user that exists in the database.',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderDTO,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: string): Promise<ApiResponseDTO<OrderDTO>> {
    return await this.orderServices.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: OrderDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of order that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiBody({
    type: UpdateOrderDTO,
    description: 'Data to update record.',
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Param('id') id: any,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<ApiResponseDTO<OrderDTO>> {
    return await this.orderServices.update(id, updateOrderDTO);
  }

  @Patch(':id/status')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order status.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: OrderDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of order that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiBody({
    type: UpdateOrderStatusDTO,
    description: 'Data to update record.',
    required: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async updateStatus(
    @Param('id') id: any,
    @Body() updateOrderStatusDTO: UpdateOrderStatusDTO,
  ): Promise<ApiResponseDTO<OrderDTO>> {
    return await this.orderServices.updateStatus(id, updateOrderStatusDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete order.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of order that exists in the database.',
    type: String,
    format: 'uuid',
    required: true,
  })
  @ApiNoContentResponse({
    description: 'Record has been deleted successfully.',
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  async remove(@Param('id') id: string) {
    return await this.orderServices.remove(id);
  }
}
