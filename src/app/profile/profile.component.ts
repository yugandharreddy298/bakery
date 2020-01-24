import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontEndConfig } from '../frontendConfig';
import { GeneralService } from '../services/general.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private frontendConfig: FrontEndConfig, private generalService: GeneralService) { }
  
  serverUrl = this.frontendConfig.serverurl  
  userProfile:any

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem('currentUser'));    
    if(this.userProfile) this.getUserProfile()
    // document.getElementById('home-tab').click()              
  }

  getUserProfile(){
    this.generalService.getUserProfile().subscribe(data =>{
      console.log(data);
      return data;
    })
  }

  editProfile(){
    console.log(this.userProfile)
  }
}
