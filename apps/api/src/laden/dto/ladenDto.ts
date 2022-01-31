import { IsIn, IsInt, IsNotEmpty, IsNumber } from "class-validator"

export class LadenDto {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    name: string
    @IsIn([0,1])
    online: boolean
}