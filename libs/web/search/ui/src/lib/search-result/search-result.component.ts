import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
