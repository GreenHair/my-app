import { toEntityDto } from '@my-app/api/utils/mapper';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EinkommenDto } from 'libs/shared/util/dto/src/lib/einkommen.dto';
import { NewEinkommenDto } from 'libs/shared/util/dto/src/lib/newEinkommen.dto';
import { RechnungQuery } from 'libs/shared/util/dto/src/lib/RechnungQuery';
import { ApiFeatureIncomeService } from './api-feature-income.service';

@Controller('income')
export class ApiFeatureIncomeController {
  constructor(private service: ApiFeatureIncomeService) {}
 
  @Get()
    async getAll(@Query(new ValidationPipe()) query: RechnungQuery): Promise<EinkommenDto[]> {
        const list = await this.service.getAll(query)
        return toEntityDto([], list)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<EinkommenDto> {
        const kategorie = await this.service.getone(id)
        return toEntityDto(new EinkommenDto(), kategorie)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() kategorie: NewEinkommenDto): Promise<EinkommenDto> {
        const newKategorie = await this.service.create(kategorie)
        return toEntityDto(new EinkommenDto(), newKategorie)
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: number, @Body() kategorie: EinkommenDto): Promise<EinkommenDto> {
        const updated = await this.service.update(id, kategorie)
        return toEntityDto(new EinkommenDto(), updated)
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const deleted = await this.service.remove(id)
        return deleted
    }
}

