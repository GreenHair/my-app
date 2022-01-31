import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produktgruppe } from '../entities/Produktgruppe';
import { Repository } from 'typeorm';
import { NewProduktgruppeDto } from './dto/newProduktgruppeDto';
import { ProduktgruppeDto } from './dto/produktgruppeDto';

@Injectable()
export class ProduktgruppeService {
    constructor(@InjectRepository(Produktgruppe) private readonly repo: Repository<Produktgruppe>) {}

    async getone(id: number): Promise<Produktgruppe> {
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

    async create(newProduktgruppeDto: NewProduktgruppeDto): Promise<Produktgruppe> {
        let kategorie =  await this.repo.create(newProduktgruppeDto)
        return this.repo.save(kategorie)
    }

    async update(id: number, produktgruppeDto: ProduktgruppeDto): Promise<Produktgruppe> {
        let kategorie = await this.getone(id)
        kategorie.bezeichnung = produktgruppeDto.bezeichnung
        kategorie.essen = produktgruppeDto.essen
        return this.repo.save(kategorie)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
