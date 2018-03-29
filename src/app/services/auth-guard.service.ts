import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private auth:AuthService) { }

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    console.log(next);
    if( this.auth.isAuthenticated() ){
      console.log("Pasó por el Guard!");
      return true;
    }else{
      console.error("URL protegida");
      return false;
    }
  }

}
