import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  FieldStatusEnum,
  OrderStatusEnum,
  OrderTypeEnum,
  Prisma,
} from '@prisma/client';

export class CreateOrderDTO {
  @ApiProperty({
    description: 'Order userId.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({
    description: 'Customer info ',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  customerInfo?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Customer deliveryInfo ',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  deliveryInfo?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'Customer deliveryInfo ',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  items?: Prisma.JsonArray;

  @ApiPropertyOptional({
    description: 'subTotalPrice',
    type: Number,
    required: false,
  })
  @IsOptional()
  subTotalPrice: number;

  @ApiPropertyOptional({
    description: 'deliveryFee',
    type: Number,
    required: false,
  })
  @IsOptional()
  deliveryFee: number;

  @ApiPropertyOptional({
    description: 'vat',
    type: Number,
    required: false,
  })
  @IsOptional()
  vat: number;

  @ApiPropertyOptional({
    description: 'discount',
    type: Number,
    required: false,
  })
  @IsOptional()
  discount: number;

  @ApiPropertyOptional({
    description: 'totalPrice',
    type: Number,
    required: false,
  })
  @IsOptional()
  totalPrice: number;

  @ApiPropertyOptional({
    description: 'Order Status.',
    enum: OrderTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderTypeEnum)
  orderType: OrderTypeEnum;

  @ApiPropertyOptional({
    description: 'Order Status.',
    enum: OrderStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatusEnum)
  orderStatus: OrderStatusEnum;

  @ApiProperty({
    description: 'Record Status.',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsDefined()
  @IsEnum(FieldStatusEnum)
  status: FieldStatusEnum;

  @ApiProperty({
    description: 'Extra details of the records can be put here.',
    type: JSON,
    required: false,
  })
  @IsDefined()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiProperty({
    description: 'user id by whom the record was created.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  createdById?: string;

  @ApiProperty({
    description: 'time when the record was created.',
    type: Date,
    required: false,
  })
  @IsDefined()
  @IsDateString({ strict: true } as any)
  createdAt?: Date;

  constructor(partial: Partial<CreateOrderDTO>) {
    Object.assign(this, partial);
  }
}
