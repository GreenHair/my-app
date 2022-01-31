import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { FamilienmitgliedDto } from "../../familienmitglied/dto/familienmitgliedDto";

export class NewEinkommenDto {
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