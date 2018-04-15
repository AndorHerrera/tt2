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
import { ProfileComplete } from '../_models/profileComplete.model';

@Injectable()
export class ProfileService {

    constructor(private _http: Http) {
    }

    getUser(): Observable<ProfileComplete> {
        const url = Constants.endpointAuth + "api/users/google-oauth2%7C108145525627017879290?_=1523824095153";
        return this._http.get(url).map((response: Response) => {
            return <ProfileComplete><any>response.json();
        });
    }

}