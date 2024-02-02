import { SetMetadata } from '@nestjs/common';
import { RoloCollection } from '../schemas/collection';

export const ROLES_KEY = 'roles';
export const Roles = (roles: RoloCollection) => SetMetadata(ROLES_KEY, roles);