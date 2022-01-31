import { Transform, Type } from "class-transformer";
import { IsDate, IsIn, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { Ausgaben } from "../../entities/Ausgaben";
import { Familienmitglied } from "../../entities/Familienmitglied";
import { Laden } from "../../entities/Laden";
import { FamilienmitgliedDto } from "../../familienmitglied/dto/familienmitgliedDto";
import { LadenDto } from "../../laden/dto/ladenDto";

export class NewRechnungDto {
    @Type(() => LadenDto)
    @IsNotEmpty()
    laden: LadenDto
    
    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    datum: Date

    @IsOptional()
    @IsIn([0,1])
    @ValidateIf(val => val != undefined)
    einmalig: number

    @Type((() => FamilienmitgliedDto))
    @IsNotEmpty()
    person: FamilienmitgliedDto

    @IsNotEmpty()
    ausgaben: Ausgaben[]
}