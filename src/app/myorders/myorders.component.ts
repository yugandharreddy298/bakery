import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontEndConfig } from '../frontendConfig';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  constructor(private route: ActivatedRoute,private frontendConfig: FrontEndConfig, private productService: ProductService) { }
  serverUrl = this.frontendConfig.serverurl
  userProfile:any
  myOrders:any
  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));    
    this.getMyOders()
  }

  getMyOders() {
    if (this.userProfile) {
      this.productService.getMyOders().subscribe((data: any) => {
        this.myOrders = data
        console.log(data)
      },error =>{
        console.log(error)
      })
    }
  }
}
