import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private auth:AuthService) { 
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.auth.login();
  }

  login(){
    this.auth.login();
  }

}
