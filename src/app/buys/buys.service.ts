import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Proyect } from 'app/_models/proyect.model';
import { Tag } from '../_models/tag.model';
import { Buy } from '../_models/buy.model';

@Injectable()
export class BuysService {

    constructor(private _http: Http) {
    }

    getBuysBySub(sub:string): Observable<Array<Buy>> {
        const url = Constants.endpoint + "/api/buys/user/"+sub;
        return this._http.get(url).map((response: Response) => {
            return <Array<Buy>><any>response.json();
        });
    }

    addBuys(mBuy:Buy): Observable<Buy> {
        const url = Constants.endpoint + "/api/buys/";
        return this._http.post(url,mBuy).map((response: Response)=>{
            return <Buy><any>response.json();
        });
    }
}