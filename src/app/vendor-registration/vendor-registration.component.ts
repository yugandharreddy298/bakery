import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from "@angular/forms";

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
  constructor() { }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pincodes: string[] = [];
  pincodeCtrl = new FormControl();
  ngOnInit() {
  }
 /*
   Input : entered text
   Output : type number will be output
     */
  //---------------function called for allowing input type only as number ---------------//
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }



  selected(event: MatAutocompleteSelectedEvent): void {
    this.pincodeInput.nativeElement.value = '';
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
    }
  }

  vendorCreation(vendorform){
    console.log(vendorform.value,vendorform.valid);
    if(vendorform.valid){
      
    }
  }

}
