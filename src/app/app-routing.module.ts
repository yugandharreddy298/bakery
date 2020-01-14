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
const routes: Routes = [
  // {path:'',component:AppComponent},
  {path:'vendor',component:VendorRegistrationComponent },
  {path:'masterproduct',component:MasterproductComponent},
  {path:'home',component:HomeComponent},
  {path:'orders',component:MyordersComponent},
  {path:'cart',component:CartComponent},
  {path:'products',component:ProductComponent},
  {path:'categories',component:CategoriesComponent},  
  {path:'categories/:category',component:CategoriesComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
