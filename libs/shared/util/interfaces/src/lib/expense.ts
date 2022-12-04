import { Category } from "./category";


export interface Expense {
    id?: number,
    description: string,
    amount: number,
    category: Category,
    invoiceNr?: number
}