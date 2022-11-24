import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.services';
import { ApiResponseDTO } from 'src/core/dtos';
import { UserDTO } from '../dtos';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  //create new --------
  async create(createUserDTO): Promise<ApiResponseDTO<UserDTO>> {
    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          ...createUserDTO,
        },
      });

      return {
        status: 'success',
        data: new UserDTO(createdUser),
        message: 'The User Users has been successfully created.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  // find all--------
  async findAll(): Promise<any> {
    try {
      const totalCount = await this.prismaService.user.count({});
      if (totalCount === 0) {
        return {
          status: 'success',
          data: null,
          message: 'No user found.',
        };
      }

      const User = await this.prismaService.user.findMany({});

      return {
        status: 'success',
        data: User,
        message: ' Users retrieve successful.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //find one ------
  async findOne(id: any): Promise<any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });

      if (user === null) {
        return {
          status: 'success',
          data: null,
          message: 'No user found.',
        };
      }
      return {
        status: 'success',
        data: user,
        message: ' Users retrieve successful.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //update ----------
  async update(
    id: any,
    updateUserDTO: object,
  ): Promise<ApiResponseDTO<UserDTO>> {
    try {
      const updatedUserData = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          ...updateUserDTO,
        },
      });
      return {
        status: 'success',
        data: updatedUserData,
        message: 'User info has been updated.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //status update ----------
  async updateStatus(
    id: any,
    updateUserStatusDTO: object,
  ): Promise<ApiResponseDTO<UserDTO>> {
    try {
      const updatedUserData = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          ...updateUserStatusDTO,
        },
      });
      return {
        status: 'success',
        data: updatedUserData,
        message: 'User Users status has been updated.',
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  //remove
  async remove(id: any) {
    try {
      return await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}
