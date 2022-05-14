import { CategoryDto } from "./category.dto"
import { ShopDto } from "./shop.dto"

export interface AusgabenQuery {
    description: string
    amount: number
    amountSpec: string
    date1: string
    date2: string
    dateSpec: string
    category: number
    shop: number
    recurrency: string
  }
  
  export interface DateStruct {
    year: number
    month: number
    day: number
  } 