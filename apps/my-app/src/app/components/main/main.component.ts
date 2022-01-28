import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/interfaces/IUser';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: User | null = null
  menu = [
    {title: "Dashboard", fragment: "dashboard"},
    {title: "income", fragment: "income"},
    {title: "search", fragment: "search"}
  ]

  constructor(private localStorage: LocalStorageService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.localStorage.get<User>('user')
  }

}
