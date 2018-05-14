import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Proyect } from 'app/_models/proyect.model';
import { Tag } from '../_models/tag.model';
import { Movement } from '../_models/movements.model';

@Injectable()
export class MovementsService {

    constructor(private _http: Http) {
    }

    getMovementsByIdUser(idUsuario:string): Observable<Array<Movement>> {
        const url = Constants.endpoint + "/api/movements/user/"+idUsuario;
        return this._http.get(url).map((response: Response) => {
            return <Array<Movement>><any>response.json();
        });
    }

    addMovements(movimiento: Movement): Observable<Movement> {
        const url = Constants.endpoint + "/api/movements/";
        return this._http.post(url,movimiento).map((response: Response) => {
            return <Movement><any>response.json();
        });
    }

}