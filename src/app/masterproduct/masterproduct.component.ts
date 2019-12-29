import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-masterproduct',
  templateUrl: './masterproduct.component.html',
  styleUrls: ['./masterproduct.component.css']
})
export class MasterproductComponent implements OnInit {

  constructor(private productService:ProductService) { }

  categories = [{'_id': '1234567890','name':'cakes'},{'_id': '1234567891','name':'flowers'}]
  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.productService.getCategoriesList().subscribe((data:any) =>{
      console.log(data)
      this.categories=data
    })
  }

  createPro(masterProForm){
    console.log(masterProForm.value,masterProForm.valid)
    if(masterProForm.valid){
      this.productService.createMasterProduct(masterProForm.value).subscribe(data =>{
        console.log(data)
      })
    }
  }

  imageFileInput
  imageFilesToUpload
  onFileSelected(fileInput){
    console.log(fileInput)
    this.imageFileInput=fileInput
    this.imageFilesToUpload = <Array<File>>this.imageFileInput.target.files;    
  }
  createCategory(categoryForm){
    console.log(categoryForm.value,categoryForm.valid,this.imageFilesToUpload)
    console.log(this.imageFilesToUpload.length)
    console.log(this.imageFilesToUpload[0])    
    // this.imageFilesToUpload.forEach((element,index) => {
    //   console.log(this.imageFilesToUpload[index])
    //   console.log(element)    
          
    // });
    
    if(categoryForm.valid && this.imageFilesToUpload){
      const formData:any = new FormData();
    
      for(let i=0; i<this.imageFilesToUpload.length; i++){
        console.log(this.imageFilesToUpload[i])
        formData.append("images", this.imageFilesToUpload[i])      
      }
      formData.append('data',JSON.stringify(categoryForm.value))
      console.log(formData)
      this.productService.createCategory(formData).subscribe(data =>{
        console.log(data)
      })
    }
  }
}