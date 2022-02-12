import { Module } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { LoginUserDto } from './loginUser.dto';
import { UserDto } from './user.dto';

@Module({
  controllers: [],
  providers: [],
  exports: [LoginUserDto, UserDto, CreateUserDto],
})
export class DtoModule {}
