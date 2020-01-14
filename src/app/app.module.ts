import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
// import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';

import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, 
         MatButtonModule,
         MatSidenavModule,
         MatIconModule,
         MatListModule,
         MatInputModule,
         MatChipsModule,
         MatTabsModule,
         MatSnackBarModule,
         MatExpansionModule,
         MatAutocompleteModule } from '@angular/material';
// import {MatExpansionModule} from '@angular/material/expansion';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { FrontEndConfig } from './frontendConfig'
import { GeneralService } from './services/general.service';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component';
import { CategoriesComponent } from './categories/categories.component'
import { MasterproductComponent } from './masterproduct/masterproduct.component';
import { MyordersComponent } from './myorders/myorders.component';
import { BsNavComponent } from './bs-nav/bs-nav.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component'
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { ProductsFormComponent } from './admin/products-form/products-form.component';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainNavComponent,
    ProductComponent,
    CartComponent,
    VendorRegistrationComponent,
    CategoriesComponent,
    MasterproductComponent,
    MyordersComponent,
    BsNavComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,  
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatAutocompleteModule,
    // NgbModule,
    RouterModule.forRoot([
       {path:'',component:HomeComponent},
       {path:'products',component:ProductComponent},
       {path:'myorders',component:MyordersComponent},
       {path:'cart',component:CartComponent},
       {path:'check-out',component:CheckOutComponent},
       {path:'order-success',component:OrderSuccessComponent},
       {path:'login',component:LoginComponent},
       {path:'admin/admin-products',component:AdminProductsComponent},
       {path:'admin/admin-orders',component:AdminOrdersComponent},
       {path:'admin/products/new',component:ProductsFormComponent}
  ])
  ],
  // exports:[NgbModule],
  providers: [FrontEndConfig,GeneralService,CategoryService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
