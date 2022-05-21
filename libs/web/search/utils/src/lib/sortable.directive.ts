import { Directive, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AusgabenQueryResultDto } from '@my-app/shared/util/dto';

export interface SearchresultRow {
  datum: string,
  bezeichnung: string,
  betrag: number,
  laden: string,
  kategorie: string,
  person: string,
}

export type SortColumn = keyof  SearchresultRow | ''
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[myAppSortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableDirective {

  @Input() myAppSortable: SortColumn = "";
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.myAppSortable, direction: this.direction});
  }

  constructor() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [SortableDirective],
  exports: [SortableDirective],
})
export class SortableDirectiveModule {}
