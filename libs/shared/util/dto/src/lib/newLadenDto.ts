import { IsNotEmpty } from "class-validator"
import { IsUniqueLaden } from "libs/api/utils/decorators/src/lib/isuniqueladen.decorator"

export class NewLadenDto {
    @IsNotEmpty()
    @IsUniqueLaden({message: "Laden schon vorhanden"})
    name: string
    online: boolean
}