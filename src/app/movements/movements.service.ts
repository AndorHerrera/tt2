import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Proyect } from 'app/_models/proyect.model';
import { Tag } from '../_models/tag.model';

@Injectable()
export class MovementsService {

    constructor(private _http: Http) {
    }

    getMovementsByIdUser(idUsuario:string): Observable<Array<Proyect>> {
        const url = Constants.endpoint + "/api/proyects/user/"+idUsuario;
        return this._http.get(url).map((response: Response) => {
            return <Array<Proyect>><any>response.json();
        });
    }

}