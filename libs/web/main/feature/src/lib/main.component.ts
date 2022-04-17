import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Credentials } from 'libs/shared/util/dto/src/lib/credentials.dto';
import { AuthService } from 'libs/web/login/data-access/src/lib/auth.service';
import { LocalStorageService } from 'libs/web/shared/local-storage-service/src/lib/local-storage.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap'
import { filter, map, Observable, startWith } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isMenuCollapsed: boolean = true
  user: Credentials | null = null
  menu = [
    { title: "Dashboard", fragment: "dashboard" },
    { title: "Invoice", fragment: "invoice" },
    { title: "Camera", fragment: "camera" },
  ]
  selectedTab$: Observable<string>

  constructor(
    private localStorage: LocalStorageService, 
    public route: ActivatedRoute, 
    private authService: AuthService, 
    private router: Router) {
      this.selectedTab$ = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(e => (e as NavigationEnd).url.substring(1)),
        startWith(this.router.url.substring(1))
      )
    }

  ngOnInit(): void {
    this.user = this.localStorage.get<Credentials>('user')
    
  }

  logout() {
    this.authService.logout()
  }

}
