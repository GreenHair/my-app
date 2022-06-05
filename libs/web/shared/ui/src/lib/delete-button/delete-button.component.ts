import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
