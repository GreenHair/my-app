import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { LadenDto } from '../laden/dto/ladenDto';
import { toEntityDto } from '../shared/mapper';
import { NewProduktgruppeDto } from './dto/newProduktgruppeDto';
import { ProduktgruppeDto } from './dto/produktgruppeDto';
import { ProduktgruppeService } from './produktgruppe.service';

@Controller('produktgruppe')
export class ProduktgruppeController {
    constructor(private service: ProduktgruppeService) {}

    @Get()
    async getAll(): Promise<ProduktgruppeDto[]> {
        const list = await this.service.getAll()
        return toEntityDto([], list)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<ProduktgruppeDto> {
        const kategorie = await this.service.getone(id)
        return toEntityDto(new ProduktgruppeDto(), kategorie)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() kategorie: NewProduktgruppeDto): Promise<ProduktgruppeDto> {
        const newKategorie = await this.service.create(kategorie)
        return toEntityDto(new ProduktgruppeDto(), newKategorie)
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: number, @Body() kategorie: ProduktgruppeDto): Promise<ProduktgruppeDto> {
        const updated = await this.service.update(id, kategorie)
        return toEntityDto(new ProduktgruppeDto(), updated)
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const deleted = await this.service.remove(id)
        return deleted
    }
}
