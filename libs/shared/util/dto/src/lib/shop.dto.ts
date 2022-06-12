import { IsIn, IsNotEmpty } from "class-validator"

export class ShopDto {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    name: string
    //@IsIn([0,1])
    online: boolean
}