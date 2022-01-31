import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { toEntityDto } from '../shared/mapper';
import { LadenDto } from './dto/ladenDto';
import { NewLadenDto } from './dto/newLadenDto';
import { LadenService } from './laden.service';

@Controller('laden')
export class LadenController {
    constructor(private service: LadenService){}
    
    @Get()
    async getAll(): Promise<LadenDto[]> {
        const list = await this.service.getAll()
        return toEntityDto([], list)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<LadenDto>　{
        const laden = await this.service.getOne(id)
        return toEntityDto(new LadenDto(),　laden)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() laden: NewLadenDto): Promise<number> {
        const newLaden = await this.service.create(laden)
        return toEntityDto(new LadenDto(), newLaden)
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    async update(@Param("id") id: number, @Body() laden: LadenDto) {
        const updated = await this.service.update(id, laden)
        return updated
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        const deleted = await this.service.remove(id)
        return deleted
    }
}
