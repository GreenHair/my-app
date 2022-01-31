import { IsNotEmpty } from "class-validator"
import { IsUniqueCategory } from "../isuniquecategory.decorator"

export class NewProduktgruppeDto {
    @IsNotEmpty()
    @IsUniqueCategory({message: "Kategorie existiert schon"})
    bezeichnung: string
    essen: boolean
}