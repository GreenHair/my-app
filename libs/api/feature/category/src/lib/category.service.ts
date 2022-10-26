import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produktgruppe, Ausgaben } from '@my-app/api/data-access/entities';
import { NewCategoryDto, CategoryDto } from '@my-app/shared/util/dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Produktgruppe) private readonly repo: Repository<Produktgruppe>) {}

    async getOne(id: number): Promise<Produktgruppe> {
        const kategorie = await this.repo.findOneBy({
            id: id
        })

        if(!kategorie) {
            throw new HttpException("Kategorie nicht gefunden",
            HttpStatus.NOT_FOUND)
        }

        return kategorie
    }

    async getByArticle(article: string): Promise<Produktgruppe | undefined> {
        const category = await this.repo.createQueryBuilder("category")
        .addSelect("COUNT(category.ID)", "count")
        .leftJoin(Ausgaben, "article", "article.prodGr = category.id" )
        .groupBy("category.ID")
        .where("article.bezeichnung = :article", { article : article })
        .orderBy("count", "DESC")
        .getOne()
        
        return category || undefined
    }

    async findByName(name: string): Promise<Produktgruppe | null> {
        return this.repo.findOneBy({bezeichnung: name})
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
