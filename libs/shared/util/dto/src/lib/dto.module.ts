import { Module } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { Credentials } from './credentials.dto';
import { LoginUserDto } from './loginUser.dto';
import { RegistrationStatus } from './registrattionStatus.dto';
import { UserDto } from './user.dto';

@Module({
  controllers: [],
  providers: [],
  exports: [LoginUserDto, UserDto, CreateUserDto, Credentials, RegistrationStatus],
})
export class DtoModule {}
