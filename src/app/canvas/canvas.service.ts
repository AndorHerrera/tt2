import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from 'app/constants.class';
import { Kanban } from 'app/_models/kanban.model';
import { Tag } from '../_models/tag.model';
import { HomeworkMin } from '../_models/homework.min.model';
import { Homework } from 'app/_models/homework.model';

@Injectable()
export class KanbanService {

    constructor(private _http: Http) {
    }

    getKanban(id:string): Observable<Array<Kanban>> {
        const url = Constants.endpoint + "/api/kanbans/proyect/" + id;
        return this._http.get(url).map((response: Response) => {
            return <Array<Kanban>><any>response.json();
        });
    }

    addKanban(kanban: Kanban): Observable<Array<Kanban>> {
        const url = Constants.endpoint + "/api/kanbans/";
        return this._http.post(url,kanban).map((response: Response) => {
            return <Array<Kanban>><any>response.json();
        });
    }

    editKanban(kanban: Kanban,id:string): Observable<Array<Kanban>> {
        const url = Constants.endpoint + "/api/kanbans/"+id;
        return this._http.put(url,kanban).map((response: Response) => {
            return <Array<Kanban>><any>response.json();
        });
    }

    // Tareas del Kanban

    getHomeworks(id:string): Observable<Array<HomeworkMin>> { // By idKanban
        const url = Constants.endpoint + "/api/homeworks/version/minificada/" + id;
        return this._http.get(url).map((response: Response) => {
            return <Array<HomeworkMin>><any>response.json();
        });
    }

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
    }

}