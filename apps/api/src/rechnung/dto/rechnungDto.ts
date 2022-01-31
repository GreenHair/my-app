import { IsDate, IsIn, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { Ausgaben } from "../../entities/Ausgaben";
import { Familienmitglied } from "../../entities/Familienmitglied";
import { Laden } from "../../entities/Laden";

export class RechnungDto {
    @IsNotEmpty()
    id: number
    
    @IsNotEmpty()
    laden: Laden
    
    @IsNotEmpty()
    @IsDate()
    date: Date

    @IsOptional()
    @IsIn([0,1])
    @ValidateIf(val => val != null)
    einmalig: number

    @IsNotEmpty()
    person: Familienmitglied

    @IsNotEmpty()
    posten: Ausgaben[]
}