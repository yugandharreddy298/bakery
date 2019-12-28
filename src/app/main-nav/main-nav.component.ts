import { Component } from '@angular/core';
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
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  loginDetails:any;
  
  
  constructor(private breakpointObserver: BreakpointObserver,
     private generalService:GeneralService,
     public router: Router) {}
  checkLog(msg){
    console.log(msg)
    if(msg=='login' && !this.loginDetails){
      document.getElementById('loginModalBtn').click()
    }
    else if(msg=='signup' && !this.loginDetails){
      document.getElementById('signupModalBtn').click()      
    }
    else{
      console.log('already loged')
    }
  }
  closeModal(id){
    console.log(id)
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
          this.closeModal('loginModalBtn')
          this.generalService.setUserLoggedIn(data.token)
          if(data.role=='admin'){
            this.router.navigate(['/vendorreg'])
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
}
