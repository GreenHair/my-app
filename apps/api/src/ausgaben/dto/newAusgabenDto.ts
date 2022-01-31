import { IsNotEmpty, IsNumber } from "class-validator"
import { Produktgruppe } from "../../entities/Produktgruppe"
import { ProduktgruppeDto } from "../../produktgruppe/dto/produktgruppeDto"

export class NewAusgabenDto {
    @IsNotEmpty()
    bezeichnung: string
    @IsNotEmpty()
    @IsNumber()
    betrag: number
    @IsNotEmpty()
    prodGr: Produktgruppe
}