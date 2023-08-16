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
import { FieldStatusEnum, Prisma } from '@prisma/client';

export class CreateUserDTO {
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

  @ApiPropertyOptional({
    description: 'User password ',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'User address ',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  address?: Prisma.JsonValue;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is admin',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is Super User',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isSuperUser?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is email verified',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Is phone verified',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPhoneVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Record Status.',
    enum: FieldStatusEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(FieldStatusEnum)
  status?: FieldStatusEnum;

  @ApiPropertyOptional({
    description: 'Extra details of the records can be put here.',
    type: JSON,
    required: false,
  })
  @IsOptional()
  @IsObject()
  metaData?: Prisma.JsonValue;

  @ApiPropertyOptional({
    description: 'user id by whom the record was created.',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  createdById?: string;

  @ApiPropertyOptional({
    description: 'time when the record was created.',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString({ strict: true } as any)
  createdAt?: Date;

  constructor(partial: Partial<CreateUserDTO>) {
    Object.assign(this, partial);
  }
}
