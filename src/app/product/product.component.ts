import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService:ProductService,private generalService:GeneralService) { }
  productsList:Array<any>
  inProductAddingMode:boolean
  userProfile
  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));
    
    this.productService.getVendorProducts({vendorId:this.userProfile._id}).subscribe((data:any) => {
      console.log(data)
      this.productsList=data
    })
    this.productService.getMasterProducts().subscribe((data:any) => {
      console.log(data)
    })
    
  }

  addProduct(){
    this.inProductAddingMode=true;    
  }



}
