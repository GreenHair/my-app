import { Exclude, Type } from "class-transformer"
import { IsNotEmpty, IsNumber } from "class-validator"
import { CategoryDto } from "./category.dto"

export class AusgabenDto {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    bezeichnung: string
    @IsNotEmpty()
    @IsNumber()
    betrag: number
    @Type(() => CategoryDto)
    @IsNotEmpty()
    prodGr: CategoryDto
    @Exclude()
    @IsNotEmpty()
    rechnungsnr: number
}