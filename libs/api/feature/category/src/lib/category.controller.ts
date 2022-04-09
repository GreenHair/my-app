import { toEntityDto } from '@my-app/api/utils/mapper';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { NewCategoryDto } from 'libs/shared/util/dto/src/lib/newCategory.dto';
import { threadId } from 'worker_threads';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) { }

  @Get()
  async getAll(@Query() query : {article : string}): Promise<CategoryDto[]> {
    if(query.article){
      const category = await this.service.getByArticle(query.article)
      const ret = plainToInstance(CategoryDto, category)
      const temp = []
      temp.push(ret)
      return temp
    }
    const list = await this.service.getAll()
    return toEntityDto([], list)
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<CategoryDto> {
    const kategorie = await this.service.getOne(id)
    return toEntityDto(new CategoryDto(), kategorie)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() kategorie: NewCategoryDto): Promise<CategoryDto> {
    const newKategorie = await this.service.create(kategorie)
    return toEntityDto(new CategoryDto(), newKategorie)
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  async update(@Param("id") id: number, @Body() kategorie: CategoryDto): Promise<CategoryDto> {
    const updated = await this.service.update(id, kategorie)
    return toEntityDto(new CategoryDto(), updated)
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    const deleted = await this.service.remove(id)
    return deleted
  }
}
