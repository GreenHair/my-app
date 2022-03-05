import { IsDate, IsIn, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { AusgabenDto } from "./ausgaben.dto"
import { FamilienmitgliedDto } from "./familienmitglied.dto"
import { ShopDto } from "./shop.dto"


export class RechnungDto {
    @IsNotEmpty()
    id: number
    
    @IsNotEmpty()
    laden: ShopDto
    
    @IsNotEmpty()
    @IsDate()
    date: Date

    @IsOptional()
    @IsIn([0,1])
    @ValidateIf(val => val != null)
    einmalig: number

    @IsNotEmpty()
    person: FamilienmitgliedDto

    @IsNotEmpty()
    posten: AusgabenDto[]
}