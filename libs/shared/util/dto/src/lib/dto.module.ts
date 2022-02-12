import { Module } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryListDto } from './categoryList.dto';
import { CreateUserDto } from './createUser.dto';
import { Credentials } from './credentials.dto';
import { LoginUserDto } from './loginUser.dto';
import { NewCategoryDto } from './newCategory.dto';
import { RegistrationStatus } from './registrattionStatus.dto';
import { UserDto } from './user.dto';

@Module({
  controllers: [],
  providers: [],
  exports: [
    LoginUserDto,
    UserDto,
    CreateUserDto,
    Credentials,
    RegistrationStatus,
    CategoryDto,
    NewCategoryDto,
    CategoryListDto
  ],
})
export class DtoModule { }
