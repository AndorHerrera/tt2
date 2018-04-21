import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

import { CookieOptions } from 'angular2-cookie/services/base-cookie-options';
import { User } from '../_models/user.model';

const id_key = 'f_usr_id';
const nm_key = 'f_usr_nm';
const sub_key = 'f_usr_sub';
const nknm_key = 'f_usr_nknm';
const fln_key = 'f_usr_fln';
const mln_key = 'f_usr_mln';
const pic_key = 'f_usr_pic';

@Injectable()
export class SessionService {

    constructor(private _cookieService: CookieService) {

    }

    public updated = new EventEmitter();

    /*
    public setToken(token: AuthToken) {
        if (token != null) {
            let tokenExpiresIn = new Date(new Date().getTime() + (1000 * token.expires_in));
            let options = new CookieOptions();
            options.expires = tokenExpiresIn;
            this._cookieService.put('access_token', token.access_token, options);
        }
    }*/

    public getUser(): User {
        let user: User = null;
        if (localStorage.getItem(nknm_key) != null) {
            user = new User();
            user.id = localStorage.getItem(id_key);
            user.name = localStorage.getItem(nm_key);
            user.sub = localStorage.getItem(sub_key);
            user.nickname = localStorage.getItem(nknm_key);
            user.fatherLastName = localStorage.getItem(fln_key);
            user.motherLastName = localStorage.getItem(mln_key);
            user.picture = localStorage.getItem(pic_key);
        }
        console.log(user);
        return user;
    }

    public setUser(user: User) {
        if (user != null) {
            if (user.id != null) { localStorage.setItem(id_key, user.id); }
            if (user.name != null) { localStorage.setItem(nm_key, user.name); }
            if (user.sub != null) { localStorage.setItem(sub_key, user.sub); }
            if (user.nickname != null) { localStorage.setItem(nknm_key, user.nickname); }
            if (user.fatherLastName != null) { localStorage.setItem(fln_key, user.fatherLastName); }
            if (user.motherLastName != null) { localStorage.setItem(mln_key, user.motherLastName); }
            if (user.picture != null) { localStorage.setItem(pic_key, user.picture); }
        }
        console.log("Usuario localstorage"+user);
        console.log("Usuario localstorage"+user.sub);
        console.log("Usuario localstorage"+user.nickname);
        this.updated.emit();
    }
    
    public clearUser() {
        localStorage.removeItem(id_key);
        localStorage.removeItem(nm_key);
        localStorage.removeItem(sub_key);
        localStorage.removeItem(nknm_key);
        localStorage.removeItem(fln_key);
        localStorage.removeItem(mln_key);
        localStorage.removeItem(pic_key);
    }
}