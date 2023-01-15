import { IExpense } from "@my-app/shared/util/interfaces"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber } from "class-validator"
import { CategoryDto } from "./category.dto"
import { RechnungDto } from "./rechnung.dto"

export class AusgabenQueryResultDto implements IExpense{
    @IsNotEmpty()
    id: number
    
    @IsNotEmpty()
    bezeichnung: string
    
    @IsNotEmpty()
    @IsNumber()
    betrag: number
    
    @Type(() => CategoryDto)
    prodGr: CategoryDto
    
    @Type(() => RechnungDto)
    rechnungsnr: RechnungDto
}