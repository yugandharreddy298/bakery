import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FrontEndConfig } from '../frontendConfig';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private frontendConfig: FrontEndConfig, private generalService: GeneralService) { }
  products: any
  userProfile: any
  serverUrl = this.frontendConfig.serverurl
  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.route.snapshot.params.id)
    this.getCategories()
  }

  getCategories() {
    this.productService.getProducts().subscribe((data: any) => {
      console.log(data)
      this.products = data
    })
  }

  addToCart(item) {
    console.log(item);
    if (this.userProfile) {
      this.productService.addToCart(item._id, { productId:item._id, quantity: 1, mode:'add' }).subscribe((data: any) => {
        console.log(data)
      },error =>{
        console.log(error)
      })
    }
  }

  productDetails(item) {
    console.log(item);

  }
}
