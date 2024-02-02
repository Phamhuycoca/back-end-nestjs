import { User } from "src/schemas/collections/user.schema";

export enum UserOrderBy {
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updatedAt',
}

export const UserAttributesForList: (keyof User)[] = [
    '_id',
    'id',
    'createdAt',
    'updatedAt',
    'fisrt_name',
    'last_name',
    'gender',
    'email',
    'password',
    'role'
];

export const UserAttributesForDetail: (keyof User)[] = 
[
    '_id',
    'id',
    'createdAt',
    'updatedAt',
    'fisrt_name',
    'last_name',
    'gender',
    'email',
    'password',
    'role'
];
