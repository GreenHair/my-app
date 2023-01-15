// import { RechnungDto } from "libs/shared/util/dto/src/lib/rechnung.dto";
import { IExpense, IPerson, IReceipt, IShop } from "@my-app/shared/util/interfaces";

export class Invoice implements IReceipt {
    id?: number | undefined;
    laden: IShop;
    datum: string;
    einmalig: number;
    person: IPerson;
    ausgaben: IExpense[];
    get date() : Date {
        return new Date(this.datum)
    }

    set date(value: Date) {
        this.datum = `${value.getFullYear}-${value.getMonth() + 1}-${value.getDay()}`
    }

    get sum() : number {
        return this.ausgaben.map(a => a.betrag)
        .reduce((previous, current) => previous + current, 0)
    }
}