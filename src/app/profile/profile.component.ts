import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from './profile.service';
import { SessionService } from '../services/sessionService.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile:any;
  ndownloads:number=0;
  nuploads:number=0;

  constructor(public auth:AuthService, public _userService:ProfileService, private _sessionService: SessionService) { }

  ngOnInit() {
    this.profile = this._sessionService.getUser();
  }

}
