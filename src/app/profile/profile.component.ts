import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile:any;
  ndownloads:number=0;
  nuploads:number=0;

  constructor(public auth:AuthService, public _userService:ProfileService) { }

  ngOnInit() {
    console.log("profile"+this.auth.getProfile);
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log(this.profile);

    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile);

      });
    }

    this._userService.getUser().subscribe(response => {
      console.log(response);
    });
  }

}
