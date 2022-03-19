import { toEntityDto, toInvoiceDto } from '@my-app/api/utils/mapper';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewRechnungDto } from 'libs/shared/util/dto/src/lib/newRechnung.dto';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { RechnungQuery } from 'libs/shared/util/dto/src/lib/RechnungQuery';
import { ApiFeatureInvoiceService } from './api-feature-invoice.service';

@Controller('invoice')
export class ApiFeatureInvoiceController {
  constructor(private service: ApiFeatureInvoiceService) {}

  @Get()
    async getAll(@Query(new ValidationPipe()) query: RechnungQuery): Promise<RechnungDto[]> {
        const list = await this.service.getAll(query)
        return toEntityDto([], list)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<RechnungDto> {
        const kategorie = await this.service.getone(id)
        return toEntityDto(new RechnungDto(), kategorie)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() invoice: NewRechnungDto): Promise<RechnungDto> {
        const newInvoice = await this.service.create(invoice)
        return toInvoiceDto(newInvoice)
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: number, @Body() kategorie: RechnungDto): Promise<RechnungDto> {
        const updated = await this.service.update(id, kategorie)
        return toEntityDto(new RechnungDto(), updated)
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const deleted = await this.service.remove(id)
        return deleted
    }
}
