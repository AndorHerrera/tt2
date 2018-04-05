import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Folder } from '../../../_models/folder.model';
import { ProyectDetailsService } from '../../../proyectdetails/proyectdetails.service';
import { Url } from '../../../_models/url.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  editableItem:Folder = new Folder;
  titulo:string;
  idFather:string;
  nameFather:string;
  idProyecto:string;
  folder:Folder;
  

  @Output()
  folderEvent = new EventEmitter();
  
  constructor(private _proyectDetailsService: ProyectDetailsService) { }

  ngOnInit() {
  }

  guardar(){
    if(this.folder.path=="Home"){
      this.editableItem.path = this.folder.id;
    } else {
      this.editableItem.path = this.folder.path + "/" + this.folder.name;
    }
    this.editableItem.name = this.titulo;
    this.editableItem.idFather = this.idFather;
    this.editableItem.idProyect=this.idProyecto;
    this.editableItem.superFather=false;
    this._proyectDetailsService.addFolder(this.editableItem).subscribe(response => {
      this.guardaFisico(this.editableItem.path,this.nameFather,response.id);
    });
  }

  guardaFisico(folder:string,nameFather:string,id:string){
    if(id!=undefined){
      let formData: FormData = new FormData();
      formData.append('url',folder);
      this._proyectDetailsService.addFisicFolder(formData,this.editableItem.name).subscribe(response => {
        console.log(response);
        this.folderEvent.emit();
      });
    }
  }

  removeAll(){
    this.titulo="";
    this.idFather="";
    this.idProyecto="";
  }

}
