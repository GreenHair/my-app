import { IExpense } from "./iexpense";
import { IPerson } from "./iperson";
import { IShop } from "./ishop";

export interface IReceipt {
    id?: number,
    laden: IShop,
    datum: string,
    einmalig: number,
    person: IPerson,
    ausgaben: IExpense[]
}