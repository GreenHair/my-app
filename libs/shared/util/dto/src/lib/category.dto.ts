import { IsIn, IsNotEmpty } from "class-validator"

export class CategoryDto {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    bezeichnung: string
    @IsIn([0,1])
    essen: boolean
}