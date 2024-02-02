import { ApiPropertyOptional } from '@nestjs/swagger';

import { Types } from 'mongoose';
import { OrderDirection } from './constant';

export class CommonListQuery {
    page?: number;
    limit?: number;
    orderDirection?: OrderDirection;
    keyword?: string;
}

export class CommonListDropdownQuery {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: OrderDirection;
    keyword?: string;
}

export interface IUserTokenPayload {
    id: string;
    email: string;
    name: string;
    expiresIn: number;
    hashToken?: string;
    isMultiFactorAuthenticated?: boolean;
}

export interface IUserToken extends IUserTokenPayload {
    iat: number;
    exp: number;
}

export interface ILoggedInApiAccessToken {
    _id: Types.ObjectId;
    isPlatformAdmin: boolean;
    organizationIds: string[];
}
