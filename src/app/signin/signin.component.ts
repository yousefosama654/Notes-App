import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var particlesJS: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  errormessage: string = '';
  wordOfSubmit: string = 'login';
  isloading: boolean = false;
  submitForm() {
    if (this.loginform.valid) {
      this.wordOfSubmit = 'wating';
      this.isloading = true;
      this._AuthService.signin(this.loginform.value).subscribe((response) => {
        if (response.message === 'success') {
           localStorage.setItem("token",response.token);
           this._AuthService.saveuserdata();
           this._Router.navigate(["/home"]);
          localStorage.setItem("id",response.user._id)
          this.wordOfSubmit = 'sign up';
          this.isloading = false;
        } else {
          this.errormessage = response.message;
          this.wordOfSubmit = 'sign up';
          this.isloading = false;
        }
      });
    }
  }
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json');
  }
}
