import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EinkommenDto } from '@my-app/shared/util/dto';

@Pipe({
  name: 'groupByMonth',
})
export class GroupByMonthPipe implements PipeTransform {
  transform(value: EinkommenDto[]): EinkommenDto[][] {
    const temp = []
    for(let i = 0; i < 12; i++) {
      temp[i] = value.filter(e => e.datum.getMonth() == i)
    }
    return temp
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [GroupByMonthPipe],
  exports: [GroupByMonthPipe],
})
export class GroupByMonthPipeModule {}
