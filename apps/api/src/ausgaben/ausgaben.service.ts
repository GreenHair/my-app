import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ausgaben } from '../entities/Ausgaben';
import { Repository } from 'typeorm';
import { NewAusgabenDto } from './dto/newAusgabenDto';
import { AusgabenDto } from './dto/ausgabenDto';
import { Produktgruppe } from '../entities/Produktgruppe';

@Injectable()
export class AusgabenService {
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

    async update(id: number, AusgabenDto: AusgabenDto): Promise<Ausgaben> {
        let ausgabe = await this.getone(id)
        ausgabe.bezeichnung = AusgabenDto.bezeichnung
        ausgabe.betrag = AusgabenDto.betrag
        ausgabe.prodGr = AusgabenDto.prodGr
        return this.repo.save(ausgabe)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
