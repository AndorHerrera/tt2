import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { ProyectsService } from '../../../proyects/proyects.service';
import { Proyect } from '../../../_models/proyect.model';
import { Tag } from '../../../_models/tag.model';
import { Select } from '../../../_models/select.model';
import { KanbanService } from '../../../canvas/canvas.service';
import { Kanban } from '../../../_models/kanban.model';
import { User } from '../../../_models/user.model';
import { ProyectDetailsService } from '../../../proyectdetails/proyectdetails.service';
import { Folder } from '../../../_models/folder.model';
import { Url } from '../../../_models/url.model';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
})
export class ProyectComponent implements OnInit {

  id:string;
  titulo:string;
  categorias:string;
  estado:string = "En Construcción";
  version:string = "1.0";
  descripcion:string;
  editableItem:Proyect = new Proyect;

  /// Multiselect
  dropdownList:Select[] = [];
  selectedItems:Select[]= [];
  dropdownSettings = {};
  optionChoise:Select[] = new Array<Select>();
  // Bandera Editar o Agregar
  accion:boolean = false; // Agregar por default
  tags:Tag[] = new Array<Tag>();

  @Output()
  proyectEvent = new EventEmitter();

  constructor(private _proyectsService: ProyectsService, private _kabanService: KanbanService,
              private _proyectDetailsService:ProyectDetailsService) { }

  ngOnInit() {
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Selecciona las categorias",
      selectAllText:'Seleccionar Todas',
      unSelectAllText:'Deseleccionar todas',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };
    this._proyectsService.getTags().subscribe(response => {
      this.tags = response;
      for(let i=0;i<this.tags.length;i++){
        let option:Select = new Select;
        option.id = this.tags[i].i;
        option.itemName = this.tags[i].descripcion;
        option._id = this.tags[i].id;
        this.optionChoise.push(option);
      }
      this.dropdownList = this.optionChoise; // Carga Opciones Tags
      console.log("Drop"+this.dropdownList.length);
    });
  }

  onItemSelect(item:any){
    //console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    //console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any){
    console.log(items);
    this.selectedItems = items;
    console.log(this.selectedItems);
  }
  onDeSelectAll(items: any){
    console.log(items);
    this.selectedItems = [];
    console.log(this.selectedItems);
  }

  guardar(){
    this.editableItem.title = this.titulo;
    this.editableItem.status = this.estado;
    this.editableItem.description = this.descripcion;  
    this.editableItem.version = this.version;
    this.editableItem.tags = [];
    for(let x=0;x<this.selectedItems.length;x++){
      let tag:Tag = new Tag;
      tag.id = this.selectedItems[x]._id ;
      tag.descripcion = this.selectedItems[x].itemName ;
      this.editableItem.tags.push(tag);
    }
    if(this.accion){ // Editar
      this.editableItem.id = this.id;
      this._proyectsService.editProyect(this.editableItem,this.id).subscribe(response => {
        this.proyectEvent.emit();
      });
    }else{ // Agregar
      this._proyectsService.addProyect(this.editableItem).subscribe(response => {
        let temporalKanban: Kanban = new Kanban;
        let usuariosKanban:User[] =[];
        temporalKanban.proyect = response;
        this.addFolderHome(response.id);
        // Usuario de Sesion
        let autorSesion:User = new User;
        autorSesion.id = "43fe9681-dd53-4bb4-9bfe-15fe9633ad23"
        autorSesion.name = "Salomon";
        autorSesion.fatherLastName = "Olmedo";
        autorSesion.motherLastName = "Garcia";
        autorSesion.phone = "5533887728"
        autorSesion.email = "beko@gmail.com";
        autorSesion.gender = "M";
        autorSesion.password = "12345";
        autorSesion.birthday =  new Date("2018-01-17T02:03:51.000Z");
        autorSesion.activo = true;
        autorSesion.fechaCreacion = new Date("2018-03-11T20:27:06.000Z");
        autorSesion.fechaModificacion = new Date("2018-03-11T20:27:06.000Z");
        usuariosKanban.push(autorSesion);
        temporalKanban.users = usuariosKanban;
        console.log(response);
        this._kabanService.addKanban(temporalKanban).subscribe(response => {
          this.proyectEvent.emit();
        });
      });
    }
  }

  removeAll(){
    this.titulo="";
    this.categorias="";
    this.estado="En Construcción";
    this.version="1.0";
    this.descripcion="";
    this.selectedItems = [];
    this.accion=false;
  }

  addFolderHome(id:string){
    console.log("Entra a addFolderhOME ID:"+id);
    if(id!=undefined){
      console.log("Entra a addFolderhOME");
      let folder:Folder = new Folder;
      folder.idFather=id;
      folder.idProyect=id;
      folder.name="Home";
      folder.path="Home";
      folder.superFather=true;
      this._proyectDetailsService.addFolder(folder).subscribe(response => {
        console.log("este es el folder"+response);
        console.log("este es el folder id"+response.id);
        this.addFisicFolderHome(response.id);
      });
    }
  }

  addFisicFolderHome(id:string){
    console.log("Entra a addFisicFolderHome ID:"+id);
    if(id!=undefined){
      console.log("Entra a addFisicFolderHome");
      let formData: FormData = new FormData();
      formData.append('url','');
      this._proyectDetailsService.addFisicFolder(formData,id).subscribe(response => {
        console.log(response);
      });
    }
  }

}
