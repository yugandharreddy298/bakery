import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-masterproduct',
  templateUrl: './masterproduct.component.html',
  styleUrls: ['./masterproduct.component.css']
})
export class MasterproductComponent implements OnInit {

  constructor(private productService:ProductService,private generalService:GeneralService) { }
  @ViewChild('fileUploader') fileUploader:ElementRef;

  categories = []
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
      this.productService.addMasterProduct(masterProForm.value).subscribe(data =>{
        console.log(data)
        masterProForm.resetForm();
        this.generalService.openSnackBar("Master Product added Successfully",'X')
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
    if(categoryForm.valid && this.imageFilesToUpload){
      const formData:any = new FormData();
      for(let i=0; i<this.imageFilesToUpload.length; i++){
        formData.append("images", this.imageFilesToUpload[i])      
      }
      formData.append('data',JSON.stringify(categoryForm.value))
      console.log(formData)
      this.productService.createCategory(formData).subscribe(data =>{
        console.log(data)
        categoryForm.resetForm()
        this.imageFileInput=null
        this.imageFilesToUpload=null
        this.fileUploader.nativeElement.value = null;
        this.generalService.openSnackBar("Category added Successfully",'X')        
      })
    }
  }
}
