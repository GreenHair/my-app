import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from 'libs/shared/util/dto/src/lib/credentials.dto';
import { LocalStorageService } from 'libs/web/shared/local-storage-service/src/lib/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isMenuCollapsed: boolean = true
  user: Credentials | null = null
  menu = [
    {title: "Dashboard", fragment: "dashboard"},
    {title: "Invoice", fragment: "invoice"},
  ]

  constructor(private localStorage: LocalStorageService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user = this.localStorage.get<Credentials>('user')
  }

  logout() {
    this.localStorage.set('user', '')
    this.localStorage.set('isLoggedIn', JSON.stringify(false))
    this.router.navigateByUrl('login')
  }

}
