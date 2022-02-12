import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produktgruppe } from 'libs/api/data-access/entities/src/lib/Produktgruppe';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { NewCategoryDto } from 'libs/shared/util/dto/src/lib/newCategory.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Produktgruppe) private readonly repo: Repository<Produktgruppe>) {}

    async getOne(id: number): Promise<Produktgruppe> {
        const kategorie = await this.repo.findOne(id)

        if(!kategorie) {
            throw new HttpException("Kategorie nicht gefunden",
            HttpStatus.NOT_FOUND)
        }

        return kategorie
    }

    async findByName(name: string): Promise<Produktgruppe | undefined> {
        return this.repo.findOne({bezeichnung: name})
    }

    async getAll(): Promise<Produktgruppe[]> {
        const list = await this.repo.find()
        return list
    }

    async create(newProduktgruppeDto: NewCategoryDto): Promise<Produktgruppe> {
        let kategorie =  await this.repo.create(newProduktgruppeDto)
        return this.repo.save(kategorie)
    }

    async update(id: number, produktgruppeDto: CategoryDto): Promise<Produktgruppe> {
        let kategorie = await this.getOne(id)
        kategorie.bezeichnung = produktgruppeDto.bezeichnung
        kategorie.essen = produktgruppeDto.essen
        return this.repo.save(kategorie)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
