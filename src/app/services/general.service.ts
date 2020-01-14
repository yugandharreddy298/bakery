import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "../frontendConfig"
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig,
  private snackBar:MatSnackBar) {
    this.userProfile = new EventEmitter();
    this.deliveryLocation = new EventEmitter();
   }

  public userProfile: EventEmitter<any>;
  public deliveryLocation: EventEmitter<any>;

  // For getting the backend server URL
  serverurl = this.frontendconfig.serverurl;

  openSnackBar(message, action: string) {
    this.snackBar.open(message, action, {
     duration: 5000,
     panelClass: ['bar-color'],
     horizontalPosition: 'right',
     verticalPosition: 'bottom',
     
   });
 }

  // For setting of token in local storage
  setUserLoggedIn(data) {
    var userToken = data
    localStorage.setItem('currentUser', JSON.stringify(userToken))
    this.userProfile.emit(JSON.parse(localStorage.getItem('currentUser')))
  }

  // For setting of data in localstorage
  setdeliveryLocation(data){
    localStorage.setItem('deliveryLocation', JSON.stringify(data))
    this.deliveryLocation.emit(JSON.parse(localStorage.getItem('deliveryLocation')))
  }

  // To make the token null and logout the user
  logout() {
    var userToken = { 'token': null }
    localStorage.removeItem('currentUser')
    // localStorage.setItem('currentUser', JSON.stringify(userToken))
    this.userProfile.emit(JSON.parse(localStorage.getItem('currentUser')))
    this.router.navigate(['/']);
  }

  // For user Login 
  checkLogin(data) {
    return this.http.post(this.serverurl + '/auth/local', data);
  }
  //For User Sign Up
  userSignup(signupdata){ return this.http.post(this.serverurl + '/api/users/', signupdata); }
  //To Create Vendor
  createVendor(vendordata){  return this.http.post(this.serverurl + '/api/users/', vendordata); }

  // To check Email is exist or not  
  checkEmail(email,type){
    console.log(email,type)
    return this.http.get(this.serverurl + '/api/users/checkemail/'+ email+'/'+type);
  }

  sendOTP(email){
    return this.http.get(this.serverurl + '/api/users/sendotp/'+ email);    
  }
  // To check pincode exist or not
  findPincodes(data){
    return this.http.post(this.serverurl + '/api/users/findPincode/',data);    
  }

  getUserProfile(){
    return this.http.get(this.serverurl + '/api/users/me');
  }
}
