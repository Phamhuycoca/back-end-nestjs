
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseRepository } from '../../../common/base/base.repository';
import { User, UserDocument } from '../../../schemas/collections/user.schema';
import { GetUserListQuery } from '../interface/user.interface';
import { DEFAULT_FIRST_PAGE, DEFAULT_LIMIT_FOR_PAGINATION, DEFAULT_ORDER_BY, DEFAULT_ORDER_DIRECTION, OrderDirection } from '../../../constant/constant';
import { softDeleteCondition } from './../../../constant/constant';
import { parseMongoProjection } from '../../../helpers/commonFunctions';
import { UserAttributesForList } from '../interface/user.constant';


@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }

    async findAllAndCountUserByQuery(query: GetUserListQuery) {
        try {
            const {
                keyword = '',
                page = +DEFAULT_FIRST_PAGE,
                limit = +DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
            } = query;

            const matchQuery: FilterQuery<User> = {};
            matchQuery.$and = [
                {
                    ...softDeleteCondition,
                },
            ];

            if (keyword) {
                matchQuery.$and.push({
                    name: { $regex: `.*${keyword}.*`, $options: 'i' },
                });
            }

            // if (name) {
            //     matchQuery.$and.push({
            //         name,
            //     });
            // }

            const [result] = await this.userModel.aggregate([
                {
                    $addFields: {
                        id: { $toString: '$_id' },
                    },
                },
                {
                    $match: {
                        ...matchQuery,
                    },
                },
                {
                    $project: parseMongoProjection(UserAttributesForList),
                },
                {
                    $facet: {
                        count: [{ $count: 'total' }],
                        data: [
                            {
                                $sort: {
                                    [orderBy]:
                                        orderDirection === OrderDirection.ASC
                                            ? 1
                                            : -1,
                                    ['_id']:
                                        orderDirection === OrderDirection.ASC
                                            ? 1
                                            : -1,
                                },
                            },
                            {
                                $skip: (page - 1) * limit,
                            },
                            {
                                $limit: Number(limit),
                            },
                        ],
                    },
                },
            ]);
            return {
                totalItems: result?.count?.[0]?.total || 0,
                items: result?.data || [],
            };
        } catch (error) {
            this.logger.error(
                'Error in UserRepository findAllAndCountUserByQuery: ' + error,
            );
            throw error;
        }
    }
    // async findOne(email: string): Promise<User | undefined> {
    //     try {
    //       const user = await this.userModel.findOne({ email }).exec();
    //       return user;
    //     } catch (error) {
    //         this.logger.error(
    //             'Error in UserRepository Email: ' + error,
    //         );
    //         throw error;
    //     }
    //   }
    async findOne(email: string): Promise<User | undefined> {
        try {
          const user = await this.userModel.findOne({ email }).exec();
          return user;
        } catch (error) {
          console.error(`Error finding user: ${error}`);
          throw new Error('Failed to find user');
        }
      }
      
}
