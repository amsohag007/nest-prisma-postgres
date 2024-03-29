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

export class UserDTO {
  @ApiProperty({
    description: 'User firstName.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    description: 'User firstName.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional({
    description: 'User lastName.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User userName ',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'User email ',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User phone ',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  phone: string;

  // @ApiPropertyOptional({
  //   description: 'User password ',
  //   type: String,
  //   required: false,
  // })
  // @IsOptional()
  // @IsString()
  @Exclude()
  password?: string;

  @ApiPropertyOptional({
    description: 'User address ',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  address?: Prisma.JsonValue;

  @ApiProperty({
    type: Boolean,
    description: 'Is admin',
    required: false,
  })
  @IsDefined()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Is Super User',
    required: false,
  })
  @IsDefined()
  @IsBoolean()
  isSuperUser: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Is email verified',
    required: false,
  })
  @IsDefined()
  @IsBoolean()
  isEmailVerified: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Is phone verified',
    required: false,
  })
  @IsDefined()
  @IsBoolean()
  isPhoneVerified: boolean;

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
  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
