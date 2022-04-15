import { RechnungDto } from "libs/shared/util/dto/src/lib/rechnung.dto";

export class Invoice extends RechnungDto {
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