import { IsNotEmpty } from "class-validator"
// import { IsUniqueCategory } from 'libs/api/feature/category/src/lib/isuniquecategory.decorator'

export class NewCategoryDto {
    @IsNotEmpty()
    // @IsUniqueCategory({message: "Kategorie existiert schon"})
    bezeichnung: string
    essen: boolean
}