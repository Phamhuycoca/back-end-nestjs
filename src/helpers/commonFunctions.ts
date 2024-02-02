import bcrypt from 'bcrypt';
import { camelCase, mapKeys } from 'lodash';
import { Types } from 'mongoose';


export function extractToken(authorization = '') {
    if (/^Bearer /.test(authorization)) {
        return authorization.substring(7, authorization.length);
    }
    return '';
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}




/**
 * usecase: convert value of $select operator to value of $project operator in mongodb
 * example: ['_id', 'name'] => {
 *      _id: 1,
 *      name: 1,
 * }
 * @param attributeList attributes list select from mongo collection
 * @returns attributes list in $project operation
 */
export const parseMongoProjection = (
    attributeList: string[],
    opts?: { prefix?: string; exclude?: boolean },
): Record<string, number> => {
    const { prefix, exclude } = opts ?? {};
    let rs = {};
    attributeList.forEach((val) => {
        const path = prefix?.length ? `${prefix}.${val}` : val;
        rs = {
            ...rs,
            [path]: exclude ? 0 : 1,
        };
    });

    return rs;
};

export const toObjectId = <T extends SchemaId | SchemaId[]>(
    id: T,
): T extends SchemaId
    ? Types.ObjectId
    : T extends SchemaId[]
      ? Types.ObjectId[]
      : undefined => {
    try {
        if (!id) {
            return undefined;
        }
        if (Array.isArray(id)) {
            return id.map((item) => new Types.ObjectId(item.toString())) as any;
        }
        return new Types.ObjectId(id.toString()) as any;
    } catch (error) {
        return undefined;
    }
};

export function parseToCamelCase(data) {
    data = mapKeys(data, (value, key) => camelCase(key));
    return data;
}



export const generateRandomString = (length: number) => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
    }
    return result;
};
