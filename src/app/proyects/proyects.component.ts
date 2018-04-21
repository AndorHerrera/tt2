import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ProyectsService } from './proyects.service';
import { Proyect } from '../_models/proyect.model';
import { ProyectComponent } from '../_modals/proyects/proyect/proyect.component';
import { Select } from '../_models/select.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { Profile } from '../_models/profile.model';
import { UserService } from '../user/user.service';
import { User } from '../_models/user.model';
import { PersonComponent } from '../_modals/person/person.component';
import { KanbanService } from '../canvas/canvas.service';
import { SessionService } from '../services/sessionService.service';
declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  public proyectos: Proyect[] = [];
  public proyecto: Proyect;
  blockLoader:boolean=true;
  profile:Profile=new Profile;
  idUsuario:string;
  listUsers:User[] = [];

  @ViewChild(ProyectComponent)
  modalProyects: ProyectComponent;

  @ViewChild(PersonComponent)
  modalPersonal: PersonComponent;

  constructor(private _proyectsService: ProyectsService,private router:Router, private auth:AuthService,
              private _proyectDetailsService: ProyectDetailsService,private _userService: UserService,
              private _kanbanService: KanbanService, private _sessionService: SessionService) { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['Ultima Actualización','Estado','Acciones'],
      dataRows: []
    };

    if(this._sessionService.getUser()!=null){
      this.idUsuario = this._sessionService.getUser().sub;
      this.getProyectsFist();
    }
    
  }

  elementoGuardado(){
    $.notify({
        icon: "pe-7s-diskette",
        message: "<b>PROYECTO GUARDADO DE FORMA EXITOSA!!.</b>"
    },{
        type:'success',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
    this.getProyects();
  }

  getProyectsFist(){ // Obtiene los items de la tabla
    if(this.idUsuario!=undefined){
      this._proyectsService.getProyectsByIdUser(this.idUsuario).subscribe(response => {
        this.proyectos = response;
        this.cargaTabla();
        this.blockLoader =false;
      });
    }
  }

  getProyects(){ // Obtiene los items de la tabla
    if(this.idUsuario!=undefined){
      this._proyectsService.getProyectsByIdUser(this.idUsuario).subscribe(response => {
        this.proyectos = response;
        $('#myTable').DataTable().destroy();
        this.cargaTabla();
        this.blockLoader =false;
      });
    }
  }

  editar(id:string){ // Obtiene los items de la tabla
    this._proyectsService.getProyect(id).subscribe(response => {
        this.proyecto = response;
        this.sendModalProyects();
    });
  }

  sendModalProyects(){ // Manda Datos a modal Proyects
    this.modalProyects.id = this.proyecto.id;
    this.modalProyects.titulo = this.proyecto.title;
    this.modalProyects.estado = this.proyecto.status;
    this.modalProyects.version = this.proyecto.version;
    this.modalProyects.descripcion = this.proyecto.description;
    this.modalProyects.accion = true;
    this.modalProyects.selectedItems = [];
    let tags:Select[] = [];
    for(let x=0;x<this.proyecto.tags.length;x++){
      let tag:Select = new Select;
      tag.id = this.proyecto.tags[x].i;
      tag.itemName = this.proyecto.tags[x].descripcion;
      tag._id = this.proyecto.tags[x].id;
      tags.push(tag);
    }
    this.modalProyects.selectedItems = tags;
  }

  verKanban(idProyecto:string) {
    this.router.navigate(['/canvas',idProyecto]);
  }

  verIssues(idProyecto:string){
    this._proyectDetailsService.getFolder(idProyecto).subscribe(response => {
      let folder:Folder = response[0];
      if(folder.id!=undefined){
        this.router.navigate(['/issues',folder.id]);      
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

  addSonar(idProyecto:string) {
    this.router.navigate(['/validando',idProyecto]);      
  }

  verDetalle(idProyecto:string) {
    this._proyectDetailsService.getFolder(idProyecto).subscribe(response => {
      let folder:Folder = response[0];
      if(folder.id!=undefined){
        this.router.navigate(['/proyectDetails',folder.id]);
      }
    });
  }

  assessment(idProyecto:string){
    this.router.navigate(['/assessment',idProyecto]);      
  }
  

  mouseEnter(div : string){
    console.log("mouse enter : " + div);
  }

  mouseLeave(div : string){
   console.log('mouse leave :' + div);
  }

  newPerson(usuarios:User[],idProyecto:string){
    console.log("usuarios: "+usuarios);
    this._userService.getUsers().subscribe(response => {
      this.listUsers = response;
      let users:User[] = usuarios;
      let c:User[] = this.listUsers.filter(function(objFromA) {
        return !users.find(function(objFromB) {
          return objFromA.sub === objFromB.sub
        })
      })
      this.modalPersonal.listUsers = c;
      this._kanbanService.getKanban(idProyecto).subscribe(response => {
        let kanban = response[0];
        this.modalPersonal.kanban = kanban;
      });
    });
  }

  personaGuardada(){
    $.notify({
      icon: "pe-7s-diskette",
      message: "<b>COLABORADOR GUARDADO DE FORMA EXITOSA!!.</b>"
    },{
        type:'success',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
    this.getProyects();
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