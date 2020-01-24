import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GeneralService } from '../services/general.service';
import { FrontEndConfig } from '../frontendConfig';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(
    private generalService: GeneralService,
    private frontendConfig: FrontEndConfig,
    private productService: ProductService) {
  }
  @ViewChild('bannerimageField') bannerimageField:ElementRef;
  bannerList:any
  serverUrl = this.frontendConfig.serverurl
  
  ngOnInit() {
    this.productService.getBanner().subscribe((data:any)=>{
      console.log(data)
      this.bannerList = data
    })
  }

  bannerimageFilesToUpload
  onBannerSelected(fileInput){
    console.log(fileInput)
    this.bannerimageFilesToUpload = <Array<File>>fileInput.target.files;    
  }


  addBanner(bannerForm) {
    console.log(bannerForm.value,bannerForm.valid,this.bannerimageFilesToUpload)    
    if(bannerForm.valid && this.bannerimageFilesToUpload){
      const formData:any = new FormData();
      formData.append('banner',this.bannerimageFilesToUpload[0])      
      formData.append('data',JSON.stringify(bannerForm.value))
      console.log(formData)
      this.productService.addBanner(formData).subscribe(data =>{
        console.log(data)
        bannerForm.resetForm()
        this.bannerimageFilesToUpload=null;
        this.bannerimageField.nativeElement.value = null;
        this.generalService.openSnackBar("Banner added Successfully",'X')        
      })
    }
  }

}
