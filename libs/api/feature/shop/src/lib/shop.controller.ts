import { toEntityDto } from '@my-app/api/utils/mapper';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { NewShopDto } from 'libs/shared/util/dto/src/lib/newShop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private service: ShopService) {

  }

  @Get()
    async getAll(): Promise<ShopDto[]> {
        const list = await this.service.getAll()
        return toEntityDto([], list)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<ShopDto> {
        const laden = await this.service.getOne(id)
        return toEntityDto(new ShopDto(), laden)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() laden: NewShopDto): Promise<number> {
        const newLaden = await this.service.create(laden)
        return toEntityDto(new ShopDto(), newLaden)
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: number, @Body() laden: ShopDto) {
        const updated = await this.service.update(id, laden)
        return updated
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const deleted = await this.service.remove(id)
        return deleted
    }
}

