import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FrontEndConfig } from '../frontendConfig';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private frontendConfig: FrontEndConfig, private productService: ProductService) { }
  product:any
  serverUrl = this.frontendConfig.serverurl
  userProfile:any
  cartItem:any
  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));    
    console.log(this.route.snapshot.params.id)
    this.quantity = 1    
    this.getItemInCartByProductId()
    this.productService.getProductById(this.route.snapshot.params.id).subscribe((data:any) =>{
      console.log(data)
      this.product = data
    })
  }

  quantity
  addToCart() {
    if (this.userProfile) {
      this.productService.addToCart(this.product._id, { productId:this.product._id, quantity: this.quantity, mode:'update' }).subscribe((data: any) => {
        console.log(data)
      },error =>{
        console.log(error)
      })
    }
  }

  getItemInCartByProductId() {
    if (this.userProfile) {
    this.productService.getItemInCartByProductId(this.route.snapshot.params.id).subscribe((data: any) => {
      console.log(data)
      this.cartItem = data
      this.quantity = data.quantity
    })
  }
  }

  quantityChange(operator){
    this.quantity = ((operator=='-')?(this.quantity - 1):(this.quantity + 1))
    if(this.quantity<=0) this.quantity=0
  }

}
