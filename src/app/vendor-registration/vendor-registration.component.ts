import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from "@angular/forms";
import {GeneralService} from '../services/general.service'
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css']
})
export class VendorRegistrationComponent implements OnInit {
  @ViewChild('pincodeInput') pincodeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private generalService:GeneralService) { }


  selectable = true;
  removable = true;
  addOnBlur = true;
  isEmail:boolean=false
  isPhone:boolean=false;
  emaildata:any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pincodes: string[] = [];
  pincodeCtrl = new FormControl();
  isPincodeExist = false

  ngOnInit() {
  }
 


  //---------------function called for allowing input type only as number ---------------//
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }




  selected(event: MatAutocompleteSelectedEvent): void {  this.pincodeInput.nativeElement.value = '';}

  checkPincodes(){
    this.generalService.findPincodes({pincodes:this.pincodes}).subscribe((data:any) =>{
      console.log(data)
      if(data && data.length){
        this.isPincodeExist=true
      }
      else    this.isPincodeExist=false        
    })
  }
  add(event: MatChipInputEvent): void {
    // Add pincode only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our pincode
      if ((value || '').trim()) {
        this.pincodes.push(value.trim());
        this.checkPincodes()
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.pincodeCtrl.setValue(null);
    }
  }
  remove(pincode): void {
    const index = this.pincodes.indexOf(pincode);

    if (index >= 0) {
      this.pincodes.splice(index, 1);
      this.checkPincodes()
    }
  }
//create vendor
createVendor(vendordata){
  console.log(vendordata.value,this.pincodes,this.pincodes.length)
  if(vendordata.valid && this.pincodes && this.pincodes.length && !this.isPincodeExist){
    console.log('In vendor creation')
    vendordata.value.role='vendor'
      vendordata.value.password='Password@123'
      vendordata.value.pincode=this.pincodes
    this.generalService.createVendor(vendordata.value).subscribe((data:any)=>{
      console.log(data)
      if(data){
        this.generalService.openSnackBar("Vendor Created Successfully",'X')
        vendordata.resetForm();
        this.pincodes=[];
        this.isPincodeExist=false
      }
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
}
