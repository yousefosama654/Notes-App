import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var particlesJS: any;
// important for the plugin as $ sign in jquery
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errormessage: string = '';
  wordOfSubmit: string = 'sign up';
  isloading:boolean=false;
  registerform: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [
      Validators.min(10),
      Validators.max(50),
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
      ),
    ]),
    // pattern should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
  });
  type:string="password"
  visible:boolean=false;
  view()
  {
    if(this.type=="password")
    {
      this.type='text';
      this.visible=true;
    }
    else
    {
      this.type='password';
      this.visible=false;
    }
  }
  submitForm() {
    if (this.registerform.valid) {
      this.wordOfSubmit = 'wating';
      this.isloading=true;
      this._AuthService
        .signup(this.registerform.value)
        .subscribe((response) => {
          if (response.message === 'success') {
            this.wordOfSubmit = 'sign up';
            this.isloading=false;
            this._Router.navigate(['/signin']);
          } else {
            this.errormessage = response.message;
            this.wordOfSubmit = 'sign up';
            this.isloading=false;
          }
        });
    }
  }
  gotologin() {
    this._Router.navigate(['/signin']);
  }
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json');
  }
}
