import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  articles = this.fb.array([
    this.fb.control('')
  ])

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
