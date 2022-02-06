export * from './lib/auth.controller';
export * from './lib/auth.service';
export * from './lib/auth.module';
export * from  './lib/auth.guard'

import * as bcrypt from 'bcrypt';
export const comparePasswords = async (userPassword: any, currentPassword: any) => {
    return await bcrypt.compare(currentPassword, userPassword);
};