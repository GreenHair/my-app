import { IShop } from "@my-app/shared/util/interfaces"
import { IsIn, IsNotEmpty } from "class-validator"

export class ShopDto implements IShop {
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    name: string
    //@IsIn([0,1])
    online: boolean
}