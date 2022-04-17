import { Injectable } from "@angular/core";

@Injectable()
export class Comparer {
    static  compareById(obj1 :any, obj2: any) : boolean {
        return obj1?.id === obj2?.id
    }
}