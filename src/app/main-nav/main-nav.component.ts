import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

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
  userProfile:any; // login user profile data
  invalid=false; // to show error msg in login page
  isPhone=false //to check phone number exists or not
  isEmail=false  // to check email exists or not 
  checkedEmail=false; // currently email checking or not
  isPincodeExist=null; // to check the pincode is existed or not
  deliveryLocation:any // For pincode of the delivery address
  categoriesList:any // list of categories
  constructor(private breakpointObserver: BreakpointObserver,
     private generalService:GeneralService,
     private productService:ProductService,
     public router: Router) {}

  ngOnInit(){
    this.getCategories();
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));
    this.deliveryLocation = JSON.parse(localStorage.getItem('deliveryLocation'));    
    this.generalService.userProfile.subscribe(data => {console.log(data);this.userProfile=data})
    this.generalService.deliveryLocation.subscribe(data => {console.log(data);this.deliveryLocation=data})    
    if(this.userProfile) this.getUserProfile()
    if(!(this.deliveryLocation && this.deliveryLocation.pincode)) this.buttonClick('locationModalBtn');
  }

  getCategories(){
    this.productService.getCategoriesList().subscribe((data:any) =>{
      console.log(data);
      this.categoriesList = data
    })
  }

  checkLog(msg){
    console.log(msg,this.userProfile)
    if(msg=='login' && !(this.userProfile && this.userProfile.token)){
      document.getElementById('loginModalBtn').click()
    }
    else if(msg=='signup' && !(this.userProfile && this.userProfile.token)){
      document.getElementById('signupModalBtn').click()      
    }
    else{
      console.log('already loged')
    }
  }

  buttonClick(id){
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
          this.userProfile=data
          this.buttonClick('loginModalBtn')
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
        this.userProfile=data
        if(this.userProfile){
          this.generalService.setUserLoggedIn(data);
          this.router.navigate(['/home']);this.buttonClick('signupModalCloseBtn')}
      })
    }
  }

  // To check Email Registred or not
  checkEmail(email, type) {
    if (email.value) {
      this.generalService.checkEmail(email.value, type).subscribe((data: any) => {
        console.log(data)
        if (data.email && type == 'email') {
          this.isEmail = true
        } else if(data.mobilenumber && type == 'mobilenumber'){
          this.isPhone = true
        }
      }, error =>{
        console.log(error)
        if (type == 'email') {
          this.isEmail = false
        } else if(type == 'mobilenumber'){
          this.isPhone = false
        }
      })
    }
  }


  findEmail(email) { //Check whether Email exits 
    console.log(email)
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    this.checkedEmail = false;
    if (regexp.test(email)) {
      this.generalService.checkEmail(email.toLowerCase(), 'email').subscribe(data => {
        this.isEmail = true;
        this.checkedEmail = true;                     
      },error =>{
        this.isEmail = false;
        this.checkedEmail = true;             
      })
    } else this.isEmail = false;
  }
  

  forgotPassword(form){
    console.log(form.value)
    if(form.value && form.value.email && this.isEmail){
      this.generalService.sendOTP(form.value.email).subscribe((data:any) =>{
        console.log(data);
        
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
    this.userProfile=null
  }

  getUserProfile(){
    this.generalService.getUserProfile().subscribe(data =>{
      console.log(data);
      return data;
    })
  }

  checkPincodes(){
    
  }

  setLocation(locationForm){
    console.log(locationForm.value);
    if(locationForm.valid){
      this.generalService.findPincodes({pincodes:[String(locationForm.value.pincode)]}).subscribe((data:any) =>{
        console.log(data)
        if(data && data.length){
          this.isPincodeExist=true
          this.generalService.setdeliveryLocation(locationForm.value);
          this.buttonClick('locationModalCloseBtn')
        }
        else    this.isPincodeExist=false        
      })
    }
  }
}
