import { Module } from '@nestjs/common';
import { CreateUserDto } from './createUserDto';
import { LoginUserDto } from './loginUserDto';
import { UserDto } from './userDto';

@Module({
  controllers: [],
  providers: [],
  exports: [LoginUserDto, UserDto, CreateUserDto],
})
export class DtoModule {}
