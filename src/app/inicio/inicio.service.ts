import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { User } from '../_models/user.model';


@Injectable()
export class InicioService {

    constructor(private _http: Http) {
    }

    getUserBySub(id:string): Observable<User> {
        const url = Constants.endpoint + "/api/users/bysub/" + id;
        return this._http.get(url).map((response: Response) => {
            return <User><any>response.json();
        });
    }
    
    addUser(user: User): Observable<Array<User>> {
        const url = Constants.endpoint + "/api/users/";
        return this._http.post(url,user).map((response: Response) => {
            return <Array<User>><any>response.json();
        });
    }
    
}
