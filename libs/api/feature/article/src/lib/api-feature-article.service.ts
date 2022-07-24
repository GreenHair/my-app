import { AusgabenQuery } from '@my-app/shared/util/dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ausgaben } from '@my-app/api/data-access/entities';
import { AusgabenDto, NewAusgabenDto } from '@my-app/shared/util/dto';
import { Repository } from 'typeorm';

@Injectable()
export class ApiFeatureArticleService {
    constructor(@InjectRepository(Ausgaben) private readonly repo: Repository<Ausgaben>) {}

    async getone(id: number): Promise<Ausgaben> {
        const ausgabe = await this.repo.findOne(id, {relations: ["prodGr"] })

        if(!ausgabe) {
            throw new HttpException("Ausgabe nicht gefunden",
            HttpStatus.NOT_FOUND)
        }

        return ausgabe
    }

    async getAll(): Promise<Ausgaben[]> {
        const list = await this.repo.find()
        return list
    }

    async findArticle(query: AusgabenQuery): Promise<Ausgaben[]> {
        const statement = await this.repo.createQueryBuilder("article")
        .leftJoinAndSelect("article.prodGr", "produktgruppe")
        .leftJoinAndSelect("article.rechnungsnr", "rechnung")
        .leftJoinAndSelect("rechnung.laden", "laden")
        .leftJoinAndSelect("rechnung.person", "person")
        .where("1")
        if(query.description) {
            statement.andWhere("article.bezeichnung = :description", { description : query.description })
        }
        if(query.amount) {
            switch(query.amountSpec) {
                case 'lower': 
                    statement.andWhere('article.betrag < :amount', {amount : query.amount});
                    break;
                case 'equals':
                    statement.andWhere('article.betrag = :amount', {amount: query.amount});
                    break;
                case 'higher':
                    statement.andWhere('article.betrag > :amount', {amount: query.amount});
            }
        }
        if(query.date1) {
            switch(query.dateSpec) {
                case 'before': 
                    statement.andWhere('rechnung.datum < :date1', {date1: query.date1});
                    break;
                case 'on':
                    statement.andWhere('rechnung.datum = :date1', {date1: query.date1});
                    break;
                case 'after':
                    statement.andWhere('rechnung.datum > :date1', {date1: query.date1});
                    break;
                case 'between':
                    statement.andWhere('rechnung.datum BETWEEN :date1 ABD date2', {date1: query.date1, date2: query.date2});
                    break;
            }
        }
        if(query.category) {
            statement.andWhere("article.prodGr = :cat", { cat : query.category })
        }
        if(query.shop) {
            statement.andWhere("rechnung.laden = :laden", { laden : query.shop })
        }
        if(query.recurrency) {
            if(query.recurrency == 'oneTime') {
                statement.andWhere("rechnung.einmalig = :oneTime", { oneTime : true})
            }
            if(query.recurrency == 'recurrent') {
                statement.andWhere("rechnung.einmalig = :oneTime", { oneTime : false})

            }

        }
        const list = await statement.getMany()
        return list
    }

    async getAllDescriptions(query: { startsWith: string }) : Promise<any[]> {
        const list = await this.repo.createQueryBuilder()
        .select('bezeichnung')
        .distinct(true)
        .where('bezeichnung LIKE :query', {query: `${query.startsWith}%`})
        .orderBy('bezeichnung', 'ASC')
        .limit(10)
        .getRawMany()
        return list.map(a => a.bezeichnung)
        /* const result = await getConnection()
        .getRepository(Ausgaben)
        .createQueryBuilder('ausgaben')
        .select("ausgaben.bezeichnung")
        .addSelect("ausgaben.betrag")
        .leftJoinAndSelect('ausgaben.prodGr', "produktgruppe")
        .where('ausgaben.bezeichnung LIKE :query', {query: `${query.startsWith}%`})
        .groupBy('ausgaben.bezeichnung')
        .orderBy('ausgaben.bezeichnung', 'ASC')
        .addOrderBy('ausgaben.id', 'DESC')
        .getMany()
        return result */
    }

    async create(newAusgabenDto: NewAusgabenDto): Promise<Ausgaben> {
        
        let ausgabe =  await this.repo.create(newAusgabenDto)
        return this.repo.save(ausgabe)
    }

    async update(id: number, ausgabenDto: AusgabenDto): Promise<Ausgaben> {
        let ausgabe = await this.getone(id)
        ausgabe.bezeichnung = ausgabenDto.bezeichnung
        ausgabe.betrag = ausgabenDto.betrag
        ausgabe.prodGr = ausgabenDto.prodGr
        return this.repo.save(ausgabe)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
