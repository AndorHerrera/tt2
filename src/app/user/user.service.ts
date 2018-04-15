import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Tag } from '../_models/tag.model';
import { User } from '../_models/user.model';

@Injectable()
export class UserService {

    constructor(private _http: Http) {
    }

    getUser(id:string): Observable<User> {
        const url = Constants.endpoint + "/api/users/"+id;
        return this._http.get(url).map((response: Response) => {
            return <User><any>response.json();
        });
    }

    getUsers(): Observable<Array<User>> {
        const url = Constants.endpoint + "/api/users/";
        return this._http.get(url).map((response: Response) => {
            return <Array<User>><any>response.json();
        });
    }

}