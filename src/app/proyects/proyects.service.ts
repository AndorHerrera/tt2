import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Proyect } from 'app/_models/proyect.model';
import { Tag } from '../_models/tag.model';

@Injectable()
export class ProyectsService {

    constructor(private _http: Http) {
    }

    getProyects(): Observable<Array<Proyect>> {
        const url = Constants.endpoint + "/api/proyects/";
        return this._http.get(url).map((response: Response) => {
            return <Array<Proyect>><any>response.json();
        });
    }

    getProyect(id:string): Observable<Proyect> {
        const url = Constants.endpoint + "/api/proyects/"+id;
        return this._http.get(url).map((response: Response) => {
            return <Proyect><any>response.json();
        });
    }

    editProyect(proyect: Proyect,id:string): Observable<Array<Proyect>> {
        const url = Constants.endpoint + "/api/proyects/"+id;
        return this._http.put(url,proyect).map((response: Response) => {
            return <Array<Proyect>><any>response.json();
        });
    }

    addProyect(proyect: Proyect): Observable<Proyect> {
        const url = Constants.endpoint + "/api/proyects/";
        return this._http.post(url,proyect).map((response: Response) => {
            return <Proyect><any>response.json();
        });
    }

    getTags(): Observable<Array<Tag>> {
        const url = Constants.endpoint + "/api/tags/";
        return this._http.get(url).map((response: Response) => {
            return <Array<Tag>><any>response.json();
        });
    }

    /*
    deleteProyect(idSigner: string): Observable<DataResponse<Array<Signer>>> {
        const url = Constants.endpoint + Constants.cliensServicePath + Constants.signersPath + '/' + idSigner;
        return this._http.delete(url).map((response: Response) => {
            return <DataResponse<Array<Signer>>><any>response.json();
        });
    }

    editProyect(signer: Signer, idSigner: string): Observable<DataResponse<Array<Signer>>> {
        const url = Constants.endpoint + Constants.cliensServicePath + Constants.signersPath + '/' + idSigner;
        return this._http.put(url,signer).map((response: Response) => {
            return <DataResponse<Array<Signer>>><any>response.json();
        });
    }*/

}