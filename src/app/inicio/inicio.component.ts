import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'app/constants.class';
import { AuthService } from '../services/auth.service';
import { InicioService } from './inicio.service';
import { User } from '../_models/user.model';
import { SessionService } from '../services/sessionService.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private router:Router,private auth:AuthService, private _inicioService:InicioService,
              private _sessionService: SessionService) { }

  usuario:User;

  ngOnInit() {
    if (this.auth.userProfile) {
      Constants.profile = this.auth.userProfile;
      this.getUser();
    } else {
      this.auth.getProfile((err, profile) => {
        Constants.profile = profile;
        this.getUser();
      });
    }
  }

  getUser(){
    this._inicioService.getUserBySub(Constants.profile.sub).subscribe(response => {
      this.usuario = response[0];
      this.addUser();
    });
  }

  addUser(){
    if(this.usuario!=undefined){
      console.log("No entro al add")
      this._sessionService.setUser(this.usuario);
      this.router.navigate(['/proyects']);      
    } else {
      console.log("Entro al add")
      let usuario:User = new User;
      usuario.sub = Constants.profile.sub;
      usuario.picture = Constants.profile.picture;
      usuario.nickname = Constants.profile.nickname;
      this._inicioService.addUser(usuario).subscribe(response => {
        this._sessionService.setUser(response[0]);
        this.router.navigate(['/proyects']);      
      });
    }
  }

}
