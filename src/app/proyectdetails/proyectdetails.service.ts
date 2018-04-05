import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Kanban } from 'app/_models/kanban.model';
import { Tag } from '../_models/tag.model';
import { HomeworkMin } from '../_models/homework.min.model';
import { Homework } from 'app/_models/homework.model';
import { Folder } from '../_models/folder.model';
import { Files } from '../_models/files.model';
import { Url } from '../_models/url.model';

@Injectable()
export class ProyectDetailsService {

    constructor(private _http: Http) {
    }

    getFolder(id:string): Observable<Array<Folder>> {
        const url = Constants.endpoint + "/api/folders/father/" + id;
        return this._http.get(url).map((response: Response) => {
            return <Array<Folder>><any>response.json();
        });
    }

    getFolderById(id:string): Observable<Folder> {
        const url = Constants.endpoint + "/api/folders/" + id;
        return this._http.get(url).map((response: Response) => {
            return <Folder><any>response.json();
        });
    }

    addFolder(folder: Folder): Observable<Folder> {
        const url = Constants.endpoint + "/api/folders/";
        return this._http.post(url,folder).map((response: Response) => {
            return <Folder><any>response.json();
        });
    }

    getFiles(id:string): Observable<Array<Files>> { // By idFolder
        const url = Constants.endpoint + "/api/files/father/" + id;
        return this._http.get(url).map((response: Response) => {
            return <Array<Files>><any>response.json();
        });
    }

    addFisicFolder(formData: FormData,nombre:string): Observable<string> {
        const url = Constants.endpoint + "/api/proyects/upload/folder/" + nombre;
        return this._http.post(url,formData).map((response: Response) => {
            return <string><any>response;
        });
    }

    addFisicFile(formData: FormData): Observable<string> {
        const url = Constants.endpoint + "/api/proyects/upload/file/";
        return this._http.post(url,formData).map((response: Response) => {
        return <string><any>response;
        });
    }

    addFile(file: Files): Observable<Files> {
        const url = Constants.endpoint + "/api/files/";
        return this._http.post(url,file).map((response: Response) => {
            return <Files><any>response.json();
        });
    }



    /*

    getHomework(id:string): Observable<Homework> {
        const url = Constants.endpoint + "/api/homeworks/"+id;
        return this._http.get(url).map((response: Response) => {
            return <Homework><any>response.json();
        });
    }

    editHomework(homework: Homework,id:string): Observable<Array<Homework>> {
        const url = Constants.endpoint + "/api/homeworks/"+id;
        return this._http.put(url,homework).map((response: Response) => {
            return <Array<Homework>><any>response.json();
        });
    }

    addHomework(homework: Homework): Observable<Array<Homework>> {
        const url = Constants.endpoint + "/api/homeworks/";
        return this._http.post(url,homework).map((response: Response) => {
            return <Array<Homework>><any>response.json();
        });
    }*/

}