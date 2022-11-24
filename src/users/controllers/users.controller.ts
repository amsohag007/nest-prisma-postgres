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
import { UserDTO, CreateUserDTO, UpdateUserDTO } from 'src/users/dtos';
import { UsersService } from 'src/users/services';
import { ApiExceptionResponseDTO, ApiResponseDTO } from 'src/core/dtos';

@Controller('users')
@ApiBearerAuth('JWT')
@ApiTags('User API')
export class UsersController {
  constructor(private usersUserService: UsersService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user.' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: UserDTO,
    description: 'Record has been created successfully.',
  })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Data to create new record..',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<ApiResponseDTO<UserDTO>> {
    return await this.usersUserService.create(createUserDTO);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all user.' })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Records have been retrieved successfully.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findAll(): Promise<ApiResponseDTO<UserDTO>> {
    return await this.usersUserService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of a user that exists in the database.',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: UserDTO,
    description: 'Record has been retrieved successfully.',
    isArray: false,
  })
  @ApiNotFoundResponse({
    type: ApiExceptionResponseDTO,
    description: 'No data found.',
  })
  @ApiProduces('application/json')
  async findOne(@Param('id') id: any): Promise<ApiResponseDTO<UserDTO>> {
    return await this.usersUserService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user details.' })
  @ApiOkResponse({
    description: 'Record has been updated successfully.',
    type: UserDTO,
  })
  @ApiBody({
    type: UpdateUserDTO,
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
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<ApiResponseDTO<UserDTO>> {
    return await this.usersUserService.update(id, updateUserDTO);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user.' })
  @ApiParam({
    name: 'id',
    description: 'Should be an id of user that exists in the database.',
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
    return await this.usersUserService.remove(id);
  }
}
