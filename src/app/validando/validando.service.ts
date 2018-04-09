import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Proyect } from 'app/_models/proyect.model';
import { Tag } from '../_models/tag.model';
import { BodyMeasure } from '../_models/bodyMeasure.model';
import { SonarComponent } from '../_models/sonarComponent.model';
import { FileSonar } from '../_models/fileSonar.model';

@Injectable()
export class ValidandoService {

    constructor(private _http: Http) {
    }

    escaneaProyecto(id:string): Observable<string> {
        const url = Constants.endpoint + "/api/proyects/sonar/scanea/"+id;
        return this._http.get(url).map((response: Response) => {
            return <any>response;
        });
    }

    createProperties(formData: FormData): Observable<string> {
        const url = Constants.endpoint + "/api/proyects/sonar/file/";
        return this._http.post(url,formData).map((response: Response) => {
            return <any>response;
        });
    }

}