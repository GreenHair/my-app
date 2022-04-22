import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AusgabenDto, EinkommenDto } from '@my-app/shared/util/dto';
import { Invoice } from '@my-app/web/invoice/data-access';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(value: EinkommenDto[] | AusgabenDto[] | Invoice[]): number {
    if(value[0] instanceof Invoice) {
      return (value as Invoice[])
      .map(val => this.transform(val.ausgaben))
      .reduce((prev, curr) => prev + curr, 0)
    }
    return (value as EinkommenDto[] | AusgabenDto[]).map(val => val.betrag)
    .reduce((prev, curr) => prev + curr, 0)
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [SumPipe],
  exports: [SumPipe],
})
export class SumPipeModule {}
