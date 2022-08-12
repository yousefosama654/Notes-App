import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  islogin: boolean = false;
  constructor(private _AuthService: AuthService, private _Router:Router) {}
  ngOnInit(): void {
    this._AuthService.userdata.subscribe(() => {
      if (this._AuthService.userdata.getValue() != null) this.islogin = true;
      else this.islogin = false;
    });
  }
  logout() {
    this._AuthService.logout();
  }
  brandhome() {
   if(this.islogin)
   this._Router.navigate(['/home']);
   else
   this._Router.navigate(['/signup']);
  }
}
