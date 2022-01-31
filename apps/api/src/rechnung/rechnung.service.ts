import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rechnung } from '../entities/Rechnung';
import { FindManyOptions, Repository } from 'typeorm';
import { NewRechnungDto } from './dto/newRechnungDto';
import { RechnungDto } from './dto/rechnungDto';

@Injectable()
export class RechnungService {
    constructor(@InjectRepository(Rechnung) private readonly repo: Repository<Rechnung>) {}

    async getone(id: number): Promise<Rechnung> {
        const ausgabe = await this.repo.findOne(id)

        if(!ausgabe) {
            throw new HttpException("Rechnung nicht gefunden",
            HttpStatus.NOT_FOUND)
        }

        return ausgabe
    }

    async getAll(query?: any): Promise<Rechnung[]> {
        const {year, month, week} = query
        let selectQuery = this.repo.createQueryBuilder('rechnung')
        .leftJoinAndSelect("rechnung.laden", "laden")
        .leftJoinAndSelect("rechnung.person", "familienmtglied")
        .leftJoinAndSelect("rechnung.ausgaben", "ausgaben")
        .leftJoinAndSelect("ausgaben.prodGr", "produktgruppe")
        if(query.year) {
            selectQuery = selectQuery.where(`YEAR(rechnung.datum) = ${year}`)
        }
        if(query.month){
            selectQuery = selectQuery.andWhere(`MONTH(rechnung.datum) = ${month}`)
        }
        if(query.week) {
            selectQuery = selectQuery.andWhere(`WEEK(rechnung.datum) = ${week}`)
        }
        
        const list = await selectQuery.getMany()
        return list
    }

    async create(newRechnungDto: NewRechnungDto): Promise<Rechnung> {
        
        return this.repo.save(newRechnungDto)
    }

    async update(id: number, RechnungDto: RechnungDto): Promise<Rechnung> {
        let rechnung = await this.getone(id)
        rechnung.datum = RechnungDto.date
        rechnung.einmalig = RechnungDto.einmalig
        rechnung.laden = RechnungDto.laden
        rechnung.person = RechnungDto.person

        return this.repo.save(rechnung)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
