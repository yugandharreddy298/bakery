import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private productService:ProductService,private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.category)
    if(this.route.snapshot.params.category)
    {
      this.productService.getProductsByCategory(this.route.snapshot.params.category).subscribe((data:any) => {
        console.log(data)
      },error =>{
        console.log(error)
      })
    }
  }

}
