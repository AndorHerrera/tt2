import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyectdetails',
  templateUrl: './proyectdetails.component.html',
  styleUrls: ['./proyectdetails.component.scss']
})
export class ProyectdetailsComponent implements OnInit {

  idProyecto:string="";

  constructor(private _activaRoute: ActivatedRoute) {
    this._activaRoute.params.subscribe( params => {
      this.idProyecto = params['id'];
    });
   }

  ngOnInit() {
  }

}
