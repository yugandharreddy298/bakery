import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FrontEndConfig } from "../frontendConfig"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  serverurl = this.frontendconfig.serverurl;

  constructor(private http: HttpClient, private router: Router, private frontendconfig: FrontEndConfig) { }

  getCategoriesList(){
    return this.http.get(this.serverurl + '/api/category');
  }

}
