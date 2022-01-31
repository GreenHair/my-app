import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { toEntityDto } from '../shared/mapper';
import { NewRechnungDto } from './dto/newRechnungDto';
import { RechnungDto } from './dto/rechnungDto';
import { RechnungService } from './rechnung.service';
import { RechnungQuery } from './dto/RechnungQuery';

@Controller('rechnung')
export class RechnungController {
    constructor(private service: RechnungService) {}

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
    async create(@Body() kategorie: NewRechnungDto): Promise<RechnungDto> {
        const newKategorie = await this.service.create(kategorie)
        return toEntityDto(new RechnungDto(), newKategorie)
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
