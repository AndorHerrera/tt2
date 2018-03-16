import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { ProyectsService } from '../../../proyects/proyects.service';
import { Proyect } from '../../../_models/proyect.model';
import { Tag } from '../../../_models/tag.model';
import { Select } from '../../../_models/select.model';

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

  constructor(private _proyectsService: ProyectsService) { }

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
        this.proyectEvent.emit();
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

}
