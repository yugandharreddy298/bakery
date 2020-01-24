import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FrontEndConfig } from '../frontendConfig';
import { GeneralService } from '../services/general.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private frontendConfig: FrontEndConfig, private generalService: GeneralService) { }
  cartItems: any
  serverUrl = this.frontendConfig.serverurl

  ngOnInit() {
    this.getCartItems()
  }

  getCartItems() {
    this.productService.getCartItems().subscribe((data: any) => {
      console.log(data)
      this.cartItems = data
    })
  }

  placeOrder(){
    let totalAmount = 0
    let cartList = [] 
    this.cartItems.forEach(item => {
      totalAmount += item.productId.price * item.quantity 
      cartList.push(item._id)
    });
    this.productService.placeOrder({cartList:cartList, totalAmount:totalAmount}).subscribe((data:any)=>{
      console.log(data);

    })
  }
}
