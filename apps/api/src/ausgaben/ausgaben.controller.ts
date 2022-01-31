import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { toEntityDto } from '../shared/mapper';
import { AusgabenService } from './ausgaben.service';
import { AusgabenDto } from './dto/ausgabenDto';
import { NewAusgabenDto } from './dto/newAusgabenDto';

@Controller('ausgaben')
export class AusgabenController {
    constructor(private service: AusgabenService) {}

    @Get()
    async getAll(): Promise<AusgabenDto[]> {
        const list = await this.service.getAll()
        return toEntityDto([], list)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<AusgabenDto> {
        const kategorie = await this.service.getone(id)
        return toEntityDto(new AusgabenDto(), kategorie)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() kategorie: NewAusgabenDto): Promise<AusgabenDto> {
        const newKategorie = await this.service.create(kategorie)
        return toEntityDto(new AusgabenDto(), newKategorie)
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: number, @Body() kategorie: AusgabenDto): Promise<AusgabenDto> {
        const updated = await this.service.update(id, kategorie)
        return toEntityDto(new AusgabenDto(), updated)
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const deleted = await this.service.remove(id)
        return deleted
    }
}
