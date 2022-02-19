import { IsNotEmpty } from "class-validator"

export class NewFamilienmitgliedDto {
    @IsNotEmpty()
    vorname: string
    @IsNotEmpty()
    nachname: string
}