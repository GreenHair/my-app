import { IPerson } from "@my-app/shared/util/interfaces"
import { IsNotEmpty, IsIn } from "class-validator"

export class FamilienmitgliedDto implements IPerson{
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    vorname: string
    @IsNotEmpty()
    nachname: string
}