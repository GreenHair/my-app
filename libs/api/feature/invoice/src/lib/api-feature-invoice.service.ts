import { toEntityDto, toInvoiceEntity } from '@my-app/api/utils/mapper';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Rechnung } from 'libs/api/data-access/entities/src/lib/Rechnung';
import { NewRechnungDto } from 'libs/shared/util/dto/src/lib/newRechnung.dto';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ApiFeatureInvoiceService {
    constructor(@InjectRepository(Rechnung) private readonly repo: Repository<Rechnung>) {}

    async getone(id: number): Promise<Rechnung> {
        const invoice = await this.repo.findOne(id)

        if(!invoice) {
            throw new HttpException("Rechnung nicht gefunden",
            HttpStatus.NOT_FOUND)
        }

        return invoice
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

    async getYears(): Promise<number[]> {
        const years = await this.repo.createQueryBuilder('rechnung')
        .select('YEAR(datum) AS year')
        .distinct()
        .orderBy('year', 'DESC')
        .getRawMany()
        return years.map(r => r.year)
    }

    async create(newRechnungDto: NewRechnungDto): Promise<Rechnung> {
        const invoice = plainToInstance(Rechnung, newRechnungDto) //toInvoiceEntity(newRechnungDto)
        return await this.repo.save(invoice)
    }

    async update(id: number, rechnungDto: RechnungDto): Promise<Rechnung> {
        let rechnung = await this.getone(id)
        const update = plainToInstance(Rechnung, rechnungDto) //toInvoiceEntity(rechnungDto)
        rechnung = {...update, id: rechnung.id}
        //console.log("update", update)
        return this.repo.save(rechnung)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
