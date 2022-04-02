import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from 'libs/shared/util/dto/src/lib/credentials.dto';
import { AuthService } from 'libs/web/login/data-access/src/lib/auth.service';
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
    {title: "Camera", fragment: "camera"},
  ]

  constructor(private localStorage: LocalStorageService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.localStorage.get<Credentials>('user')
  }

  logout() {
    this.authService.logout()
  }

}
