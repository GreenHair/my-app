import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { RechnungQuery } from '../rechnung/dto/RechnungQuery';
import { toEntityDto } from '../shared/mapper';
import { EinkommenDto } from './dto/einkommenDto';
import { NewEinkommenDto } from './dto/newEinkommenDto';
import { EinkommenService } from './einkommen.service';

@Controller('einkommen')
export class EinkommenController {
    constructor(private service: EinkommenService) {}

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
