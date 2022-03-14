import { Type } from "class-transformer";
import { IsDate, IsIn, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { AusgabenDto } from "./ausgaben.dto";
import { FamilienmitgliedDto } from "./familienmitglied.dto";
import { NewAusgabenDto } from "./newAusgaben.dto";
import { ShopDto } from "./shop.dto";


export class NewRechnungDto {
    @Type(() => ShopDto)
    @IsNotEmpty()
    laden: ShopDto
    
    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    datum: Date

    @IsOptional()
    @IsIn([0,1])
    @ValidateIf(val => val != null)
    einmalig: number

    @Type((() => FamilienmitgliedDto))
    @IsNotEmpty()
    person: FamilienmitgliedDto

    @IsNotEmpty()
    ausgaben: NewAusgabenDto[]
}