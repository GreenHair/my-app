import { IsDate, IsIn, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { Ausgaben } from "libs/api/data-access/entities/src/lib/Ausgaben";
import { Familienmitglied } from "libs/api/data-access/entities/src/lib/Familienmitglied";
import { Laden } from "libs/api/data-access/entities/src/lib/Laden";


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