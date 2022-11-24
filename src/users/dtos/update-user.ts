import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'User Name',
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({ type: String, description: 'User Email', required: true })
  @IsString()
  @IsEmail()
  email: string;

  constructor(partial: Partial<UpdateUserDTO>) {
    Object.assign(this, partial);
  }
}
