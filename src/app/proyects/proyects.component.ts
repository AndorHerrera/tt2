import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ProyectsService } from './proyects.service';
import { Proyect } from '../_models/proyect.model';
import { ProyectComponent } from '../_modals/proyects/proyect/proyect.component';
import { Select } from '../_models/select.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
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

  @ViewChild(ProyectComponent)
  modalProyects: ProyectComponent;

  constructor(private _proyectsService: ProyectsService,private router:Router, private auth:AuthService,
              private _proyectDetailsService: ProyectDetailsService) { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['Ultima Actualización','Estado','Acciones'],
      dataRows: []
    };
    this.getProyects();
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

  getProyects(){ // Obtiene los items de la tabla
    this._proyectsService.getProyects().subscribe(response => {
        this.proyectos = response;
    });
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
  

  mouseEnter(div : string){
    console.log("mouse enter : " + div);
  }

  mouseLeave(div : string){
   console.log('mouse leave :' + div);
  }

}
