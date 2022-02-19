import { IsNotEmpty, IsIn } from "class-validator"

export class FamilienmitgliedDto {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    vorname: string
    @IsNotEmpty()
    nachname: string
}