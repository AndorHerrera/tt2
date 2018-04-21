import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants.class';
import { Profile } from 'app/_models/profile.model';
import { BuysService } from './buys.service';
import { Proyect } from '../_models/proyect.model';
import { Buy } from '../_models/buy.model';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { Router } from '@angular/router';
declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent implements OnInit {

  constructor(private _buysService: BuysService, private _proyectDetailsService: ProyectDetailsService,private router:Router) { }

  profile:Profile=new Profile;
  idUsuario:string;
  public buys: Buy[] = [];
  blockLoader:boolean=true;


  ngOnInit() {
    if(Constants.profile!=null){
      this.profile=Constants.profile;
      this.idUsuario = this.profile.sub,
      this.getBuys();
    }
  }

  getBuys(){
    if(this.idUsuario!=undefined){
      this._buysService.getBuysBySub(this.idUsuario).subscribe(response => {
        this.buys = response;
        $('#myTable').DataTable().destroy();
        this.cargaTabla();
        this.blockLoader =false;
      });
    }
  }

  verDetalle(idProyecto:string) {
    this._proyectDetailsService.getFolder(idProyecto).subscribe(response => {
      let folder:Folder = response[0];
      if(folder.id!=undefined){
        this.router.navigate(['/proyectDetails',folder.id]);
      }
    });
  }

  verGraficas(idProyecto:string) {
    this._proyectDetailsService.getFolder(idProyecto).subscribe(response => {
      let folder:Folder = response[0];
      if(folder.id!=undefined){
        this.router.navigate(['/infoCharts',folder.id]);      
      }
    });
  }

  verIssues(idProyecto:string){
    this._proyectDetailsService.getFolder(idProyecto).subscribe(response => {
      let folder:Folder = response[0];
      if(folder.id!=undefined){
        this.router.navigate(['/issues',folder.id]);      
      }
    });
  }

  cargaTabla(){
    setTimeout(function () {
      $('#myTable').DataTable({
        "aLengthMenu": [[10, 25, 100, -1], [10, 25, 100, "Todos"]],
        "iDisplayLength": 5,
        "aoColumns": [{ "bSortable": false },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false }],
          "oLanguage": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ ",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
             "sPrevious": "Anterior",
             "sNext": "Siguiente"
            },
         }
      });
    }, 1);
  }

}
