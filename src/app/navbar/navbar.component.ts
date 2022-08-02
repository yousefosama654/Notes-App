import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  islogin: boolean = false;
  constructor(private _AuthService: AuthService) {}
  ngOnInit(): void {
    this._AuthService.userdata.subscribe(() => {
      if (this._AuthService.userdata.getValue() != null) this.islogin = true;
      else this.islogin = false;
    });
  }
  logout()
  {
    this._AuthService.logout();
  }
}
