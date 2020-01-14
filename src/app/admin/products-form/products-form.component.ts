import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";
import { ProductService } from 'src/app/services/product.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
categories$;
  constructor(private router : Router,
              private categoryservice:CategoryService,
              private productservice: ProductService) { 
    this.categories$ = this.categoryservice.getCategoriesList();
  }

  ngOnInit() {}

  save(product){
    this.productservice.addMasterProduct(product);
    this.router.navigate(['/admin/products']);
  }

}
