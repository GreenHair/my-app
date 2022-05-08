import { CategoryDto } from "./category.dto"
import { ShopDto } from "./shop.dto"

export interface AusgabenQuery {
    description: string
    amount: number
    amountSpec: string
    date1: DateStruct
    date2: DateStruct
    dateSpec: string
    category: CategoryDto
    shop: ShopDto
    recurrency: string
  }
  
  export interface DateStruct {
    year: number
    month: number
    day: number
  } 