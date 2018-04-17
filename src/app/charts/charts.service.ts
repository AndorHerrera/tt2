import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Proyect } from 'app/_models/proyect.model';
import { Tag } from '../_models/tag.model';
import { BodyMeasure } from '../_models/bodyMeasure.model';
import { SonarComponent } from '../_models/sonarComponent.model';

@Injectable()
export class ChartsService {

    constructor(private _http: Http) {
    }

    

    getMesuares(id:string): Observable<SonarComponent> {
        const url = Constants.endpoint + "/api/proyects/sonar/metricas/"+id;
        return this._http.get(url).map((response: Response) => {
            //if(response.toString().indexOf("{") != -1){
                return <SonarComponent><any>response.json();
            //} 
        });
    }

    getMedidas(id:string): Observable<SonarComponent> {
        const url = Constants.endpoint + "/api/proyects/sonar/medidas/"+id;
        return this._http.get(url).map((response: Response) => {
            return <SonarComponent><any>response.json();
        });
    }

    getFolders(id:string): Observable<SonarComponent> {
        const url = Constants.endpoint + "/api/proyects/sonar/folders/"+id;
        return this._http.get(url).map((response: Response) => {
            return <SonarComponent><any>response.json();
        });
    }

    getIssues(id:string): Observable<SonarComponent> {
        const url = Constants.endpoint + "/api/proyects/sonar/issues/"+id;
        return this._http.get(url).map((response: Response) => {
            return <SonarComponent><any>response.json();
        });
    }

}