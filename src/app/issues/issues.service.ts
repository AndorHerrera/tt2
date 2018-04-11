import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { BodyIssues } from '../_models/bodyIssues.model';


@Injectable()
export class IssuesService {

    constructor(private _http: Http) {
    }

    getIssues(id:string): Observable<BodyIssues> {
        const url = Constants.endpoint + "/api/proyects/sonar/issues/" + id;
        return this._http.get(url).map((response: Response) => {
            return <BodyIssues><any>response.json();
        });
    }

}
