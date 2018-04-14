import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssuesService } from './issues.service';
import { BodyIssues } from '../_models/bodyIssues.model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  constructor(private _activaRoute: ActivatedRoute, private _issuesService:IssuesService) { }
  
  idFolder:string;
  bodyIssues:BodyIssues;
  blockLoader:boolean=true;

  ngOnInit() {
    this._activaRoute.params.subscribe( params => {
      this.idFolder = params['id'];
      this.getIssues();
    });
  }

  getIssues(){
    this._issuesService.getIssues(this.idFolder).subscribe(response => {
      this.bodyIssues = response;
      this.blockLoader = false;
  });
  }

}
