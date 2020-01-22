import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GeneralService } from '../services/general.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productsList: Array<any>
  inProductAddingMode: boolean
  userProfile
  categories$;
  @ViewChild('fileUploaderField') fileUploaderField:ElementRef;
  
  constructor(
    private generalService: GeneralService,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getCategoriesList();
  }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));
    if (this.userProfile && this.userProfile._id)
      this.productService.getVendorProducts({ vendorId: this.userProfile._id }).subscribe((data: any) => {
        console.log(data)
        this.productsList = data
      })
    this.productService.getMasterProducts().subscribe((data: any) => {
      console.log(data)
    })

  }

  thumbnailFileToUpload
  onThumbnailSelected(fileInput){
    console.log(fileInput)    
    this.thumbnailFileToUpload = <Array<File>>fileInput.target.files;
  }

  imageFilesToUpload
  onFileSelected(fileInput){
    console.log(fileInput)
    this.imageFilesToUpload = <Array<File>>fileInput.target.files;    
  }


  addProduct(productForm) {
    console.log(productForm.value,productForm.valid,this.imageFilesToUpload)    
    if(productForm.valid && this.imageFilesToUpload && this.thumbnailFileToUpload){
      const formData:any = new FormData();
      for(let i=0; i<this.imageFilesToUpload.length; i++){
        formData.append("images", this.imageFilesToUpload[i])      
      }
      formData.append('thumbnail',this.thumbnailFileToUpload[0])      
      formData.append('data',JSON.stringify(productForm.value))
      console.log(formData)
      this.productService.addVendorProduct(formData).subscribe(data =>{
        console.log(data)
        productForm.resetForm()
        this.imageFilesToUpload=null;
        this.thumbnailFileToUpload=null;
        this.fileUploaderField.nativeElement.value = null;
        this.generalService.openSnackBar("Product added Successfully",'X')        
      })
    }
  }

}
