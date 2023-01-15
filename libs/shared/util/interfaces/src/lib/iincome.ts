import { IPerson } from "./iperson";

export interface IIncome {
    nr?: number,
    datum: Date,
    bezeichnung: string,
    person: IPerson,
    betrag: number
}