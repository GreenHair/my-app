import { toArticleDto, toEntityDto } from '@my-app/api/utils/mapper';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AusgabenDto } from 'libs/shared/util/dto/src/lib/ausgaben.dto';
import { NewAusgabenDto } from 'libs/shared/util/dto/src/lib/newAusgaben.dto';
import { ApiFeatureArticleService } from './api-feature-article.service';

@Controller('article')
export class ApiFeatureArticleController {
    constructor(private service: ApiFeatureArticleService) { }

    @Get()
    async getAll(): Promise<AusgabenDto[]> {
        const list = await this.service.getAll()
        return plainToInstance(AusgabenDto, list) //toEntityDto([], list)
    }

    @Get('description')
    async getArticleDescription(@Query() query: { startsWith: string }): Promise<string[]> {
        return this.service.getAllDescriptions(query)
    }

    @Get(":id")
    async getOne(@Param("id") id: number): Promise<AusgabenDto> {
        const article = await this.service.getone(id)
        return toArticleDto(article)
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
