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
import { InicioService } from '../../../inicio/inicio.service';
import { SessionService } from '../../../services/sessionService.service';

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
              private _proyectDetailsService:ProyectDetailsService, private _userService:InicioService,
              private _sessionService: SessionService) { }

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
    this.editableItem.idUser = this._sessionService.getUser().sub;
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
      this._userService.getUserBySub(this._sessionService.getUser().sub).subscribe(usuario => {
        this.editableItem.users = [];
        this.editableItem.users.push(usuario[0]);
        this._proyectsService.addProyect(this.editableItem).subscribe(response => {
          let temporalKanban: Kanban = new Kanban;
          temporalKanban.proyect = response;
          temporalKanban.users = [];
          temporalKanban.users.push(usuario[0]);
          this._kabanService.addKanban(temporalKanban).subscribe(respuesta => {
            this.addFolderHome(response.id);
          });
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
    if(id!=undefined){
      let folder:Folder = new Folder;
      folder.idFather=id;
      folder.idProyect=id;
      folder.name="Home";
      folder.path="Home";
      folder.superFather=true;
      this._proyectDetailsService.addFolder(folder).subscribe(response => {
        this.addFisicFolderHome(response.id);
      });
    }
  }

  addFisicFolderHome(id:string){
    if(id!=undefined){
      let formData: FormData = new FormData();
      formData.append('url','');
      this._proyectDetailsService.addFisicFolder(formData,id).subscribe(response => {
        console.log(response);
        this.proyectEvent.emit();
      });
    }
  }

}
