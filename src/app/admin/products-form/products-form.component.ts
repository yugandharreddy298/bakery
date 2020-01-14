import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
categories$;
  constructor(private categoryservice:CategoryService) { 
    this.categories$ = this.categoryservice.getCategoriesList();
  }

  ngOnInit() {}

}
