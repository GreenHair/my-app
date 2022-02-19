import { IsNotEmpty, IsNumber } from "class-validator"
import { CategoryDto } from "./category.dto"

export class NewAusgabenDto {
    @IsNotEmpty()
    bezeichnung: string
    @IsNotEmpty()
    @IsNumber()
    betrag: number
    @IsNotEmpty()
    prodGr: CategoryDto
}