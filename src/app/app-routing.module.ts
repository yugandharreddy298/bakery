import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component'
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppComponent } from './app.component';
import { MasterproductComponent } from './masterproduct/masterproduct.component';

const routes: Routes = [
  // {path:'',component:AppComponent},
  {path:'vendor',component:VendorRegistrationComponent },
  {path:'masterproduct',component:MasterproductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
