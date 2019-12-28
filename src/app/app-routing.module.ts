import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component'
import { MainNavComponent } from './main-nav/main-nav.component';

const routes: Routes = [
  {path:'',component:MainNavComponent},
  {path:'vendorreg',component:VendorRegistrationComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
