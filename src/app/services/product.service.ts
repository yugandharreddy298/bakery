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

  
  // For 
  createMasterProduct(data) {
    return this.http.post(this.serverurl + '/api/masterproduct', data);
  }
  createCategory(data){
    return this.http.post(this.serverurl + '/api/category', data);
  }

  getCategoriesList(){
    return this.http.get(this.serverurl + '/api/category');
  }
}
