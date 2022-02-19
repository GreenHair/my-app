import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rechnung } from 'libs/api/data-access/entities/src/lib/Rechnung';
import { NewRechnungDto } from 'libs/shared/util/dto/src/lib/newRechnung.dto';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ApiFeatureInvoiceService {
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

    async update(id: number, rechnungDto: RechnungDto): Promise<Rechnung> {
        let rechnung = await this.getone(id)
        rechnung.datum = rechnungDto.date
        rechnung.einmalig = rechnungDto.einmalig
        rechnung.laden = rechnungDto.laden
        rechnung.person = rechnungDto.person

        return this.repo.save(rechnung)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
