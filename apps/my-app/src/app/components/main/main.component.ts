import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/IUser';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: User | null = null
  menu = [
    {title: "Dashboard", fragment: "dashboard"},
    {title: "add", fragment: "add"},
  ]

  constructor(private localStorage: LocalStorageService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.localStorage.get<User>('user')
  }

}
