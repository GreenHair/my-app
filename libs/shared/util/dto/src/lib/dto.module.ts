import { Module } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryListDto } from './categoryList.dto';
import { CreateUserDto } from './createUser.dto';
import { Credentials } from './credentials.dto';
import { LadenDto } from './ladenDto';
import { LadenListDto } from './ladenList';
import { LoginUserDto } from './loginUser.dto';
import { NewCategoryDto } from './newCategory.dto';
import { NewLadenDto } from './newLadenDto';
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
    CategoryListDto,
    LadenDto,
    LadenListDto,
    NewLadenDto
  ],
})
export class DtoModule { }
