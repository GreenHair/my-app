import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ausgaben } from 'libs/api/data-access/entities/src/lib/Ausgaben';
import { AusgabenDto } from 'libs/shared/util/dto/src/lib/ausgaben.dto';
import { NewAusgabenDto } from 'libs/shared/util/dto/src/lib/newAusgaben.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ApiFeatureArticleService {
    constructor(@InjectRepository(Ausgaben) private readonly repo: Repository<Ausgaben>) {}

    async getone(id: number): Promise<Ausgaben> {
        const ausgabe = await this.repo.findOne(id, {relations: ["prodGr"] })

        if(!ausgabe) {
            throw new HttpException("Person nicht gefunden",
            HttpStatus.NOT_FOUND)
        }

        return ausgabe
    }

    async getAll(): Promise<Ausgaben[]> {
        const list = await this.repo.find()
        return list
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
