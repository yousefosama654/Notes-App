import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userdata:any=new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem("token"))
    this.saveuserdata(); 
    // the solution of the refresh
  }
  signup(registerdata:any):Observable<any>
  {
    
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signup',registerdata);
  }
  signin(logindata:any):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signin',logindata);
  }
  saveuserdata():void
  {
    let encodedtoken=JSON.stringify(localStorage.getItem("token"));
    let decoded=jwtDecode(encodedtoken);
    this.userdata.next(decoded);
  }
  logout()
  {
    localStorage.removeItem("token");
    this.userdata.next(null);
  }
}
