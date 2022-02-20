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
    @IsNotEmpty()
    prodGr: CategoryDto
    @IsNotEmpty()
    rechnungsnr: number
}