import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EinkommenDto } from '@my-app/shared/util/dto';

@Pipe({
  name: 'groupByMonth',
})
export class GroupByMonthPipe implements PipeTransform {
  transform(value: EinkommenDto[] | null): EinkommenDto[][] {
    const temp = []
    for(let i = 0; i < 12; i++) {
      temp[i] = value?.filter(e => new Date(e.datum).getMonth() == i) ?? []
    }
    return temp.filter(e => e.length > 0)
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [GroupByMonthPipe],
  exports: [GroupByMonthPipe],
})
export class GroupByMonthPipeModule {}
