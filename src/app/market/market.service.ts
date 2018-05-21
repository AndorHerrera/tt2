import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Proyect } from 'app/_models/proyect.model';
import { Tag } from 'app/_models/tag.model';

@Injectable()
export class MarketService {
    constructor (private _http: Http){
    }

    getProyects(): Observable<Array<Proyect>> {
        const url = Constants.endpoint + "/api/proyects/status/Publicado";
        return this._http.get(url).map((response: Response) => {
            return <Array<Proyect>><any>response.json();
        });
    }

    getProyectDetail(id: string): Observable<Proyect> {
        const url = Constants.endpoint + "/api/proyects/"+id;
        return this._http.get(url).map((response: Response) => {
            return <Proyect><any>response.json();
        });
    }

    getProyectByName(parametro: string): Observable<Array<Proyect>> {
        const url = Constants.endpoint + "/api/proyects/parametro/"+parametro;
        return this._http.get(url).map((response: Response) => {
            return <Array<Proyect>><any>response.json();
        });
    }

    getProyectByTag(id: string): Observable<Array<Proyect>> {
        const url = Constants.endpoint + "/api/proyects/tags/"+id;
        return this._http.get(url).map((response: Response) => {
            return <Array<Proyect>><any>response.json();
        });
    }
}