import { IIncome } from "@my-app/shared/util/interfaces";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { FamilienmitgliedDto } from "./familienmitglied.dto";

export class EinkommenDto implements IIncome{
    @IsNotEmpty()
    nr: number

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    datum: Date

    @IsNotEmpty()
    bezeichnung: string

    @IsNotEmpty()
    person: FamilienmitgliedDto

    @IsNotEmpty()
    betrag: number

}