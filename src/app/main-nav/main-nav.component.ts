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
          this.loginDetails=data
          this.closeModal('loginModalBtn')
          this.generalService.setUserLoggedIn(data)
          if(data.role=='admin'){
            this.router.navigate(['/vendor'])
          }
        }
        console.log(data);
      })
    }
  }
  userSignup(signupdata){
    console.log(signupdata.value)
    if(signupdata.valid){
      this.generalService.userSignup(signupdata.value).subscribe((data:any)=>{
        console.log(data)
        alert("signup success")
      })
    }
  }

  Logout(){
    this.generalService.logout();
    this.loginDetails=null
  }
}
