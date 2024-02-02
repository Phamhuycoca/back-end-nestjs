import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { User } from 'src/schemas/collections/user.schema';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './interface/user.interface';
import { hashPassword } from 'src/helpers/commonFunctions';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository);
    }
    async createUser(dto: CreateUserDto) {
        try {
            dto.password=hashPassword(dto.password);
            const user: SchemaCreateDocument<User> = {
                ...(dto as any),
            };
            return await this.userRepository.createOne(user);
        } catch (error) {
            this.logger.error('Error in UserService createUser: ' + error);
            throw error;
        }
    }
}
