import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
