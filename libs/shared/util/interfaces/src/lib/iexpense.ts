import { ICategory } from "./icategory";
import { IReceipt } from "./ireceipt";


export interface IExpense {
    id?: number,
    bezeichnung: string,
    betrag: number,
    prodGr: ICategory,
    rechnungsnr?: number | IReceipt
}