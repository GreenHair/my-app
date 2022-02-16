import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laden } from 'libs/api/data-access/entities/src/lib/Laden';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { NewShopDto } from 'libs/shared/util/dto/src/lib/newShop.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
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

    async create(newLadenDto: NewShopDto) : Promise<Laden> {
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

    async update(id: number, ladenDto: ShopDto): Promise<Laden> {
        let laden = await this.ladenRepo.findOne(id)
        if(!laden) throw new HttpException('NotFound', 404)
        laden.name = ladenDto.name
        laden.online = ladenDto.online
        return this.ladenRepo.save(laden)
    }

    async remove(id: number) {
        return this.ladenRepo.delete(id)
    }
}
