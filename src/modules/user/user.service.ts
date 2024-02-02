import { ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../schemas/collections/user.schema';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto, GetUserListQuery, UpdateUserDto } from './interface/user.interface';
import { Types } from 'mongoose';
import { UserAttributesForDetail } from './interface/user.constant';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository);
    }
    //Thêm
    async createUser(dto: CreateUserDto) {
        try {           
            const user: SchemaCreateDocument<User> = {
                ...(dto as any),
            };
            return await this.userRepository.createOne(user);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Email đã tồn tại');
            }
            this.logger.error('Error in UserService createUser: ' + error);
            throw error;
        }
    }
    //Sửa
    async updateUser(id: Types.ObjectId, dto: UpdateUserDto) {
        try {
            await this.userRepository.updateOneById(id, dto);
            return await this.findUserById(id);
        } catch (error) {
            this.logger.error('Error in UserService updateUser: ' + error);
            throw error;
        }
    }

    //Xóa
    async deleteUser(id: Types.ObjectId) {
        try {
            await this.userRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in UserService deleteUser: ' + error);
            throw error;
        }
    }

    //Lấy theo id
    async findUserById(
        id: Types.ObjectId,
        attributes: (keyof User)[] = UserAttributesForDetail,
    ) {
        try {
            return await this.userRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in UserService findUserById: ' + error);
            throw error;
        }
    }

    //Danh sách
    async findAllAndCountUserByQuery(query: GetUserListQuery) {
        try {
            const result =
                await this.userRepository.findAllAndCountUserByQuery(query);
            return result;
        } catch (error) {
            this.logger.error(
                'Error in UserService findAllAndCountUserByQuery: ' + error,
            );
            throw error;
        }
    }
    

}
