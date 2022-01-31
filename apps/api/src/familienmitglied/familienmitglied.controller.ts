import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { toEntityDto } from '../shared/mapper';
import { FamilienmitgliedDto } from './dto/familienmitgliedDto';
import { NewFamilienmitgliedDto } from './dto/newFamilienmitgliedDto';
import { FamilienmitgliedService } from './familienmitglied.service';

@Controller('familienmitglied')
export class FamilienmitgliedController {
    constructor(private service: FamilienmitgliedService) {}

    @Get()
    async getAll(): Promise<FamilienmitgliedDto[]> {
        const list = await this.service.getAll()
        return toEntityDto([], list)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<FamilienmitgliedDto> {
        const familienmitglied = await this.service.getone(id)
        return toEntityDto(new FamilienmitgliedDto(), familienmitglied)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() kategorie: NewFamilienmitgliedDto): Promise<FamilienmitgliedDto> {
        const newFamilienmitglied = await this.service.create(kategorie)
        return toEntityDto(new FamilienmitgliedDto(), newFamilienmitglied)
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: number, @Body() kategorie: FamilienmitgliedDto): Promise<FamilienmitgliedDto> {
        const updated = await this.service.update(id, kategorie)
        return toEntityDto(new FamilienmitgliedDto(), updated)
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const deleted = await this.service.remove(id)
        return deleted
    }
}
