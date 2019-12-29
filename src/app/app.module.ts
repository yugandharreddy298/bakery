import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
         MatAutocompleteModule } from '@angular/material';
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
import { MyordersComponent } from './myorders/myorders.component'

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
    MyordersComponent
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
    MatAutocompleteModule,
  ],
  providers: [FrontEndConfig,GeneralService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
