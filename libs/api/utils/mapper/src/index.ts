import { Users } from 'libs/api/data-access/entities/src/lib/Users';
import { UserDto } from 'libs/shared/util/dto/src/lib/userDto';

export * from './lib/api-utils-mapper.module';


export const toUserDto = (data: Users): UserDto => {  
    const { uid, name, email } = data;
    let userDto: UserDto = { uid, name, email };
    return userDto;
};