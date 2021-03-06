import { Component, OnInit } from '@angular/core';
import { Profile } from 'app/_models/profile.model';
import { BuysService } from './buys.service';
import { Proyect } from '../_models/proyect.model';
import { Buy } from '../_models/buy.model';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { Router } from '@angular/router';
import { SessionService } from '../services/sessionService.service';
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

  constructor(private _buysService: BuysService, private _proyectDetailsService: ProyectDetailsService,
              private router:Router, private _sessionService: SessionService) { }

  profile:Profile=new Profile;
  idUsuario:string;
  public buys: Buy[] = [];
  blockLoader:boolean=true;


  ngOnInit() {
    if(this._sessionService.getUser()!=null){
      this.idUsuario = this._sessionService.getUser().sub;
      this.getBuys();
    }
  }

  getBuys(){
    console.log("Entrea a getBuys:"+this.idUsuario);
    if(this.idUsuario!=undefined){
      console.log("Entrea al if");
      this._buysService.getBuysBySub(this.idUsuario).subscribe(response => {
        console.log("entra al buyService ");
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
        "aoColumns": [{ "bSortable": false },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false }],
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
