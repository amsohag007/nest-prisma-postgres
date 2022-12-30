import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldStatusEnum, Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

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

export class OrderDTO {
  @ApiProperty({
    description: 'Order firstName.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id: string;

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
  items?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'subTotalPrice',
    type: Number,
    required: false,
  })
  @IsOptional()
  subTotalPrice: Number;

  @ApiPropertyOptional({
    description: 'deliveryFee',
    type: Number,
    required: false,
  })
  @IsOptional()
  deliveryFee: Number;

  @ApiPropertyOptional({
    description: 'vat',
    type: Number,
    required: false,
  })
  @IsOptional()
  vat: Number;

  @ApiPropertyOptional({
    description: 'discount',
    type: Number,
    required: false,
  })
  @IsOptional()
  discount: Number;

  @ApiPropertyOptional({
    description: 'totalPrice',
    type: Number,
    required: false,
  })
  @IsOptional()
  totalPrice: Number;

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

  constructor(partial: Partial<OrderDTO>) {
    Object.assign(this, partial);
  }
}
