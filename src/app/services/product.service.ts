import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "../frontendConfig"
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig) { }

  // For getting the backend server URL
  serverurl = this.frontendconfig.serverurl; 

  createCategory(data){
    return this.http.post(this.serverurl + '/api/category', data);
  }

  getCategoriesList(){
    return this.http.get(this.serverurl + '/api/category');
  }

  
  // For add master product 
  addMasterProduct(data) {
    return this.http.post(this.serverurl + '/api/masterproduct', data);
  }

  // Get Master Products list
  getMasterProducts(){
    return this.http.get(this.serverurl + '/api/masterproduct');    
  }

  // Add vendor product
  addVendorProduct(data){
    console.log(data)
    return this.http.post(this.serverurl + '/api/product',data);    
  }

  // Get vendor products list
  getVendorProducts(data){
    console.log(data)
    return this.http.get(this.serverurl + '/api/product/getVendorProducts/'+data.vendorId);    
  }
  // Get products
  getProducts(){
    return this.http.get(this.serverurl + '/api/product/');    
  }
    // Get products list by category
    getProductsByCategory(category){
      console.log(category)
      return this.http.get(this.serverurl + '/api/product/category/'+category);
    }
  addToCart(id,data){
    console.log(id,data)    
    return this.http.put(this.serverurl + '/api/cart/addtocart/'+id,data);        
  }

  getCartItems(){
    return this.http.get(this.serverurl + '/api/cart/');            
  }

  getProductById(id){
    return this.http.get(this.serverurl + '/api/product/'+id);
  }

  getItemInCartByProductId(id){
    return this.http.get(this.serverurl + '/api/cart/product/'+id);                
  }

  getMyOders(){
    return this.http.get(this.serverurl + '/api/order/myorders');                   
  }

  placeOrder(data){
    return this.http.post(this.serverurl + '/api/order/',data);                       
  }

  addBanner(data){
    return this.http.post(this.serverurl + '/api/banner/',data);                           
  }

  getBanner(){
    return this.http.get(this.serverurl + '/api/banner/');                           
  }
}
