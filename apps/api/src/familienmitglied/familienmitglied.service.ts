import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Familienmitglied } from '../entities/Familienmitglied';
import { Repository } from 'typeorm';
import { NewFamilienmitgliedDto } from './dto/newFamilienmitgliedDto';
import { FamilienmitgliedDto } from './dto/familienmitgliedDto';

@Injectable()
export class FamilienmitgliedService {
    constructor(@InjectRepository(Familienmitglied) private readonly repo: Repository<Familienmitglied>) {}

    async getone(id: number): Promise<Familienmitglied> {
        const familie = await this.repo.findOne(id)

        if(!familie) {
            throw new HttpException("Person nicht gefunden",
            HttpStatus.NOT_FOUND)
        }

        return familie
    }

    async getAll(): Promise<Familienmitglied[]> {
        const list = await this.repo.find()
        return list
    }

    async create(newFamilienmitgliedDto: NewFamilienmitgliedDto): Promise<Familienmitglied> {
        const exists = await this.repo.findOne({vorname: newFamilienmitgliedDto.vorname, nachname: newFamilienmitgliedDto.nachname})
        if(exists) {
            throw new HttpException(
                "Familienmitglied ist schon vorhanden",
                HttpStatus.BAD_REQUEST
            )
        }
        let familie =  await this.repo.create(newFamilienmitgliedDto)
        return this.repo.save(familie)
    }

    async update(id: number, familienmitgliedDto: FamilienmitgliedDto): Promise<Familienmitglied> {
        let familie = await this.getone(id)
        familie.vorname = familienmitgliedDto.vorname
        familie.nachname = familienmitgliedDto.nachname
        return this.repo.save(familie)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
