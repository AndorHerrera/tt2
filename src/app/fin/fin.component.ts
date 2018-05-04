import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/sessionService.service';

@Component({
  selector: 'app-fin',
  templateUrl: './fin.component.html',
  styleUrls: ['./fin.component.scss']
})
export class FinComponent implements OnInit {

  constructor(private auth:AuthService,private _sessionService: SessionService) { }

  ngOnInit() {
    this._sessionService.clearUser();
    this.auth.logout();
    this.auth.login();
  }
}
