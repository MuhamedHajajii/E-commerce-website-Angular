import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrls: ['./blank-navbar.component.css'],
})
export class BlankNavbarComponent implements OnInit {
  userName: string = '';
  constructor(
    private _AuthServisesService: AuthServisesService,
    private _Router: Router
  ) {}
  showSignOut(icon: HTMLSpanElement): void {
    icon.classList.toggle('d-none');
  }
  stopProp(e: Event): void {
    e.stopPropagation();
  }
  ngOnInit(): void {
    this._AuthServisesService.GetUserToken();
    this.getUserNAme();
  }
  getUserNAme(): void {
    if (localStorage.getItem('userToken') != null) {
      this.userName = this._AuthServisesService.userdata.name;
    }
  }
  singOut(): void {
    this._Router.navigate(['/login']);
    localStorage.removeItem('userToken');
  }
}
