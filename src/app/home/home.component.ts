import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FrontEndConfig } from '../frontendConfig';
import { GeneralService } from '../services/general.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private frontendConfig: FrontEndConfig, private generalService: GeneralService) { }
  products: any
  userProfile: any
  bannerList: any
  serverUrl = this.frontendConfig.serverurl

  Images = [];  
  // Images = ['../assets/bakery.jpg', '../assets/images/Carousel2.jpeg', '../assets/images/Carousel3.jpeg'];  

  SlideOptions = { items: 1, dots: true, nav: true };  
  CarouselOptions = { items: 3, dots: true, nav: true };
  
  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.route.snapshot.params.id)
    this.getCategories()
    // $("body").css("background-image", "url(serverUrl+'/'+bannerList[0].banner.path)");
    this.productService.getBanner().subscribe((data:any)=>{
      console.log(data)
      this.bannerList = data
      this.bannerList.forEach(element => {
        this.Images.push(element.banner.path)    
        // this.Images.push('../assets/bakery.jpg')        
      });
      console.log(this.Images)
      
    })
  }

  getCategories() {
    this.productService.getProducts().subscribe((data: any) => {
      console.log(data)
      this.products = data
    })
  }

  addToCart(item) {
    console.log(item);
    if (this.userProfile) {
      this.productService.addToCart(item._id, { productId:item._id, quantity: 1, mode:'add' }).subscribe((data: any) => {
        console.log(data)
      },error =>{
        console.log(error)
      })
    }
  }

  productDetails(item) {
    console.log(item);

  }
}
