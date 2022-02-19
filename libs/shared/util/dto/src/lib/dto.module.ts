import { Module } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryListDto } from './categoryList.dto';
import { CreateUserDto } from './createUser.dto';
import { Credentials } from './credentials.dto';
import { ShopDto } from './shop.dto';
import { ShopListDto } from './shopList.dto';
import { LoginUserDto } from './loginUser.dto';
import { NewCategoryDto } from './newCategory.dto';
import { NewShopDto } from './newShop.dto';
import { RegistrationStatus } from './registrattionStatus.dto';
import { UserDto } from './user.dto';
import { FamilienmitgliedDto } from './familienmitgliedDto';
import { FamilienmitgliederDto } from './familienmitgliederDto';
import { NewFamilienmitgliedDto } from './newFamilienmitgliedDto';

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
    ShopDto,
    ShopListDto,
    NewShopDto,
    FamilienmitgliedDto,
    FamilienmitgliederDto,
    NewFamilienmitgliedDto
  ],
})
export class DtoModule { }
