import { Component, OnInit } from '@angular/core';
import { MovementsService } from './movements.service';
import { Profile } from '../_models/profile.model';
import { Proyect } from '../_models/proyect.model';
import { SessionService } from '../services/sessionService.service';
declare var $:any;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {

  constructor(private _movementsService: MovementsService,private _sessionService: SessionService) { }

  profile:Profile=new Profile;
  idUsuario:string;
  public buys: Proyect[] = [];
  blockLoader:boolean=true;


  ngOnInit() {
    if(this._sessionService.getUser()!=null){
      this.idUsuario = this._sessionService.getUser().sub;
      this.getBuys();
    }
  }

  getBuys(){
    if(this.idUsuario!=undefined){
      this._movementsService.getMovementsByIdUser(this.idUsuario).subscribe(response => {
        this.buys = response;
        $('#myTable').DataTable().destroy();
        this.cargaTabla();
        this.blockLoader =false;
      });
    }
  }

  cargaTabla(){
    setTimeout(function () {
      $('#myTable').DataTable({
        "aLengthMenu": [[10, 25, 100, -1], [10, 25, 100, "Todos"]],
        "iDisplayLength": 5,
        "aoColumns": [{ "bSortable": false },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": true }],
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
