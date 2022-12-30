import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, OrderStatusEnum, Prisma } from '@prisma/client';

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

export class UpdateOrderStatusDTO {
  @ApiProperty({
    description: 'Order Status.',
    enum: OrderStatusEnum,
    required: false,
  })
  @IsDefined()
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

  @ApiPropertyOptional({
    description: 'user id by whom the record was updated.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  updatedById: string;

  @ApiPropertyOptional({
    description: 'time when the record was updated.',
    type: Date,
    required: false,
  })
  @IsDefined()
  @IsDateString({ strict: true } as any)
  updatedAt!: Date;

  constructor(partial: Partial<UpdateOrderStatusDTO>) {
    Object.assign(this, partial);
  }
}
