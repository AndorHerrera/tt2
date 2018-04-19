import { Component, OnInit } from '@angular/core';
import { ProyectsharesService } from './proyectshares.service';
import { Profile } from '../_models/profile.model';
import { Proyect } from '../_models/proyect.model';
import { Constants } from '../constants.class';
import { InicioService } from '../inicio/inicio.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { Folder } from '../_models/folder.model';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
declare var $:any;

@Component({
  selector: 'app-proyectshares',
  templateUrl: './proyectshares.component.html',
  styleUrls: ['./proyectshares.component.scss']
})
export class ProyectsharesComponent implements OnInit {


  constructor(private _proyectsharesService: ProyectsharesService,private _infoService:InicioService,private router:Router, private _proyectDetailsService: ProyectDetailsService) { }

  profile:Profile=new Profile;
  idUsuario:string;
  public buys: Proyect[] = [];
  blockLoader:boolean=true;
  usuario:User = new User;

  ngOnInit() {
    if(Constants.profile!=null){
      this.profile=Constants.profile;
      this.idUsuario = this.profile.sub,
      this.getUser();
    }
  }

  getUser(){
    this._infoService.getUserBySub(Constants.profile.sub).subscribe(response => {
      this.usuario = response[0];
      this.getBuys();
    });
  }

  getBuys(){
    if(this.usuario.id!=undefined){
      this._proyectsharesService.getProyectsSharesById(this.usuario.id).subscribe(response => {
        this.buys = response;
        $('#myTable').DataTable().destroy();
        this.cargaTabla();
        this.blockLoader =false;
      });
    }
  }

  verKanban(idProyecto:string) {
    this.router.navigate(['/canvas',idProyecto]);
  }

  verDetalle(idProyecto:string) {
    this._proyectDetailsService.getFolder(idProyecto).subscribe(response => {
      let folder:Folder = response[0];
      if(folder.id!=undefined){
        this.router.navigate(['/proyectDetails',folder.id]);
      }
    });
  }

  cargaTabla(){
    setTimeout(function () {
      $('#myTable').DataTable({
        "aLengthMenu": [[10, 25, 100, -1], [10, 25, 100, "Todos"]],
        "iDisplayLength": 5,
        "aoColumns": [{ "bSortable": false },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false }],
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
