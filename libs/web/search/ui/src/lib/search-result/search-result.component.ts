import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AusgabenQueryResultDto } from '@my-app/shared/util/dto';

@Component({
  selector: 'my-app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {

  @Input() result: AusgabenQueryResultDto[]
  
  constructor() { }

  ngOnInit(): void {
  }

}
