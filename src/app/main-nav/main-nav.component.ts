import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  loginDetails:any;
  invalid=false; // to show error msg in login page
  emaildata :any
  isPhone=false //to check phone number exists or not
  isEmail=false  // to check email exists or not 
  
  constructor(private breakpointObserver: BreakpointObserver,
     private generalService:GeneralService,
     public router: Router) {}

  ngOnInit(){
    this.loginDetails = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.loginDetails)
  }
  checkLog(msg){
    console.log(msg,this.loginDetails)
    if(msg=='login' && !(this.loginDetails && this.loginDetails.token)){
      document.getElementById('loginModalBtn').click()
    }
    else if(msg=='signup' && !(this.loginDetails && this.loginDetails.token)){
      document.getElementById('signupModalBtn').click()      
    }
    else{
      console.log('already loged')
    }
  }
  closeModal(id){
    document.getElementById(id).click()          
  }

  log(msg){
    console.log(msg)    
  }
  login(loginform){
    console.log(loginform.value,loginform.valid)
    if(loginform.valid){
      this.generalService.checkLogin(loginform.value).subscribe((data:any) =>{
        if(data && data.token){
          this.invalid=false;
          this.loginDetails=data
          this.closeModal('loginModalBtn')
          this.generalService.setUserLoggedIn(data)
          if(data.role=='admin'){
            this.router.navigate(['/vendor'])
          }
        }
      },err=>{
        this.invalid=true;
      })
    }
  }
  userSignup(signupdata){
    console.log(signupdata.value)
    if(signupdata.valid && !this.isEmail && !this.isPhone){
      this.generalService.userSignup(signupdata.value).subscribe((data:any)=>{
        console.log(data)
        this.loginDetails=data
        if(this.loginDetails){
          this.generalService.setUserLoggedIn(data);
          this.router.navigate(['/home']);this.closeModal('signupModalCloseBtn')}
      })
    }
  }

    // To check Email Registred or not
    checkEmail(email,type){
      if(email.value){
      this.generalService.checkEmail(email.value,type).subscribe((data:any)=>{
        this.emaildata=data
        console.log(this.emaildata)
        if(this.emaildata.email && type=='email'){
          // if(this.isEmail){this.isEmail=false;this.isPhone=false;}
           this.isEmail=true
        } else{
          if(this.isPhone){this.isPhone=false;this.isEmail=false}
          else this.isPhone=true
        }
      })
    } 
    }
    
      //---------------function called for allowing input type only as number ---------------//
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  Logout(){
    this.generalService.logout();
    this.loginDetails=null
  }
}
