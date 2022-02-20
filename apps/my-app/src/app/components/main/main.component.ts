import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Credentials } from 'libs/shared/util/dto/src/lib/credentials.dto';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user: Credentials | null = null
  menu = [
    {title: "Dashboard", fragment: "dashboard"},
    {title: "Invoice", fragment: "invoice"},
  ]

  constructor(private localStorage: LocalStorageService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.localStorage.get<Credentials>('user')
  }

}
