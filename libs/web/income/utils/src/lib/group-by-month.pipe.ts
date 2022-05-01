import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EinkommenDto } from '@my-app/shared/util/dto';

@Pipe({
  name: 'groupByMonth',
})
export class GroupByMonthPipe implements PipeTransform {
  transform(value: EinkommenDto[], order = 'asc'): EinkommenDto[][] {
    const temp = []
    for(let i = 0; i < 12; i++) {
      temp[i] = value?.filter(e => new Date(e.datum).getMonth() == i) ?? []
    }
    const ret = temp.filter(e => e.length > 0)
    return order.toLocaleLowerCase() == 'desc' ? ret.reverse() : ret
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [GroupByMonthPipe],
  exports: [GroupByMonthPipe],
})
export class GroupByMonthPipeModule {}
