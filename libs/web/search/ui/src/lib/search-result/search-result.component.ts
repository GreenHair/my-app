import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChildren, QueryList } from '@angular/core';
// import { AusgabenQueryResultDto } from '@my-app/shared/util/dto';
import { SortableDirective, SortEvent, SearchresultRow } from '@my-app/web/search/utils';

@Component({
  selector: 'my-app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  @Input() result: SearchresultRow[]

  constructor() { }

  ngOnInit(): void {
  }

  onSort({column, direction}: SortEvent) {

    console.log("sorting", column, direction)
    // resetting other headers
    this.headers.forEach(header => {
      if (header.myAppSortable !== column) {
        header.direction = '';
      }
    });

    // sorting result
    if (direction === '' || column === '') {
      this.result = this.result;
    } else {
      this.result = [...this.result].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  private compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  } 

}
