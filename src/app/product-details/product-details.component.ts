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
  
  ngOnInit() {
    console.log(this.route.snapshot.params.id)
    this.productService.getProductById(this.route.snapshot.params.id).subscribe((data:any) =>{
      console.log(data)
      this.product = data
    })
  }

}
