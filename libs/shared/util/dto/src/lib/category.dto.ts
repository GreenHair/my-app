import { ICategory } from "@my-app/shared/util/interfaces"
import { IsIn, IsNotEmpty } from "class-validator"

export class CategoryDto implements ICategory{
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    bezeichnung: string
    //@IsIn([0,1]) // unnecessary, automatic conversionfrom boolean to 0 or 1
    essen: boolean
}