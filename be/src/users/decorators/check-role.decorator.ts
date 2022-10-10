import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const CheckRole = (role: Role) => SetMetadata('role', role);
