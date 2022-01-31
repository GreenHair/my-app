import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laden } from '../entities/Laden';
import { toPromise } from '../shared/utils';
import { QueryFailedError, Repository } from 'typeorm';
import { LadenDto } from './dto/ladenDto';
import { NewLadenDto } from './dto/newLadenDto';

@Injectable()
export class LadenService {
    constructor(@InjectRepository(Laden) private readonly ladenRepo: Repository<Laden>) {}
    
    async getOne(id: number): Promise<Laden> {
        const laden = await this.ladenRepo.findOne(id)

        if(!laden) {
            throw new HttpException(
            "Der Laden wurde nicht gefunden",
            HttpStatus.NOT_FOUND
            )
        }

        return laden
    }

    async findByName(name: string): Promise<Laden | undefined> {
        return this.ladenRepo.findOne({name: name})
    }

    async getAll(): Promise<Laden[]> {
        const ladenList = await this.ladenRepo.find()

        return ladenList
    }

    async create(newLadenDto: NewLadenDto) : Promise<Laden> {
        /* const exist = await this.ladenRepo.find({name: newLadenDto.name})
        console.log(exist)
        if(exist.length > 0){
            throw new HttpException(
                "Laden schon vorhanden",
                HttpStatus.BAD_REQUEST
            )
        } */
        let laden = await this.ladenRepo.create(newLadenDto)
        return this.ladenRepo.save(laden)
    }

    async update(id: number, ladenDto: LadenDto): Promise<Laden| undefined> {
        let laden = await this.ladenRepo.findOne(id)
        if(laden != undefined){

            laden.name = ladenDto.name
            laden.online = ladenDto.online
            return this.ladenRepo.save(laden)
        }
        return undefined
    }

    async remove(id: number) {
        return this.ladenRepo.delete(id)
    }
}
