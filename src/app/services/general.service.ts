import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "../frontendConfig"
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig) { }

  // For getting the backend server URL
  serverurl = this.frontendconfig.serverurl;

  // For setting of token in local storage
  setUserLoggedIn(data) {
    var userToken = data
    localStorage.setItem('currentUser', JSON.stringify(userToken))
  }

  // To make the token null and logout the user
  logout() {
    var userToken = { 'token': null }
    localStorage.setItem('currentUser', JSON.stringify(userToken))
    this.router.navigate(['/']);
  }

  // For user Login 
  checkLogin(data) {
    return this.http.post(this.serverurl + '/auth/local', data);
  }



  //For User Sign Up
  userSignup(signupdata){
    return this.http.post(this.serverurl + '/api/users/', signupdata);
    
  }
}
