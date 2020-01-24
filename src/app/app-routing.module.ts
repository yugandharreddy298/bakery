import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component'
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppComponent } from './app.component';
import { MasterproductComponent } from './masterproduct/masterproduct.component';
import {MyordersComponent} from './myorders/myorders.component'
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';


import { BsNavComponent } from './bs-nav/bs-nav.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component'
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { CategoryService } from './services/category.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { BannerComponent } from './banner/banner.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'vendor',component:VendorRegistrationComponent },
  {path:'masterproduct',component:MasterproductComponent},
  {path:'home',component:HomeComponent},
  {path:'orders',component:MyordersComponent},
  {path:'cart',component:CartComponent},
  {path:'products',component:ProductComponent},
  {path:'categories',component:CategoriesComponent},  
  {path:'categories/:category',component:CategoriesComponent},
  {path:'admin/products/new',component:ProductsFormComponent},
  {path:'home/:id',component:ProductDetailsComponent},
  {path:'user/profile',component:ProfileComponent},  
  {path:'banner',component:BannerComponent},    


  // {path:'',component:HomeComponent},
  //      {path:'products',component:ProductComponent},
  //      {path:'myorders',component:MyordersComponent},
  //      {path:'cart',component:CartComponent},
  //      {path:'check-out',component:CheckOutComponent},
  //      {path:'order-success',component:OrderSuccessComponent},
  //      {path:'login',component:LoginComponent},
  //      {path:'admin/products',component:AdminProductsComponent},
  //      {path:'admin/orders',component:AdminOrdersComponent},
  //      {path:'admin/products/new',component:ProductsFormComponent},

  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
