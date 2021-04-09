import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';
import {RegisterUser} from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }

  getToken(): string{
      return localStorage.getItem("access_token");
  }

  readToken(): User{
      return helper.decodeToken(localStorage.getItem("access_token"));
  }

  isAuthenticated(): Boolean{
      if (localStorage.getItem("access_token"))
        return true;
    return false;
  }

  login(user): Observable<any>{
      return this.http.post(`${environment.userAPIBase}/api/user/login`, user);
  }

  logout(): void{
      localStorage.removeItem("access_token");
  }

  register(registerUser): Observable<any>{
      return this.http.post(`${environment.userAPIBase}/api/user/register`, registerUser);
  }
}