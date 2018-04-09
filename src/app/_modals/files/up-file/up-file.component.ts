import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DocumentFile } from '../../../../models/documenfile.model';
import { ProyectDetailsService } from '../../../proyectdetails/proyectdetails.service';
import { Files } from '../../../_models/files.model';
import { Folder } from '../../../_models/folder.model';

@Component({
  selector: 'app-up-file',
  templateUrl: './up-file.component.html',
  styleUrls: ['./up-file.component.scss']
})
export class UpFileComponent implements OnInit {

  idFolder:string="";
  folder:Folder = new Folder;
  pathFolder:string="";
  archivosLength:number=0;
  count:number=1;
  public vistaCarga: boolean = true;
  public banderaErrores: boolean = false;
  isLoading: boolean = false;
  public filesToUpload: Array<DocumentFile> = new Array<DocumentFile>();
  public namesFiles: Array<string> = new Array <string>();

  @Output()
  fileEvent = new EventEmitter();

  constructor(private _proyectDetailsService: ProyectDetailsService) { }

  ngOnInit() {
  }

  selectFile($event) {
    this.vistaCarga = true;        
    this.isLoading = false;
    this.banderaErrores = false;
    let files = $event.target.files || $event.srcElement.files;
    for (let x1 = 0; x1 < files.length; x1++) {
        var error = "";
        let extension = "";
        if(files[x1].name.lastIndexOf(".") != -1) {
            extension = files[x1].name.substring(files[x1].name.lastIndexOf("."));
        }

        if (
            // Extensiones de imagenes
            extension == ".gif" || extension == ".dib" || extension == ".jpg" || extension == ".png" ||  
            extension == ".tga" || extension == ".tif" || extension == ".tiff" || extension == ".ico" || 
            extension == ".svg" ||
            // Extensiones de web
            extension == ".htm" || extension == ".html" || extension == ".css" || extension == ".js" ||  
            extension == ".ts" || extension == ".php" || extension == ".jsp" || extension == ".jse" || 
            extension == ".url" || extension == ".xml" || extension == ".eml" || extension == ".swf" || 
            extension == ".map" ||
            // Extensiones de ficheros c
            extension == ".c" || extension == ".cpp" || extension == ".h" ||
            // Extensiones de ficheros c
            extension == ".java" || extension == ".class" || extension == ".jar" || extension == ".jad" ||
            // Extensiones de funtes tipograficas
            extension == ".eot" || extension == ".ttf" || extension == ".woff" || extension == ".woff2" ||
            extension == ".otf" ||
            // Extensiones de configuraciones 
            extension == ".mf" || extension == ".md" || extension == ".properties"
        ) {
            if(files[x1].size > 5 * 1024 * 1024){
                error = 'Error: El documento no debe de exceder los 5mb';
                this.banderaErrores = true;
            }
        } else {
            error = 'Error: Solo se pueden cargar archivos con las siguientes extensiones: []';
            this.banderaErrores = true;                
        }
        let count = 0;
        for(let i=0; i< this.filesToUpload.length; i++){
            if(files[x1].name===this.filesToUpload[i].file.name){
                count++;
            }
        }            
        if(count<1){
            let docu = new DocumentFile(files[x1],error);
            this.filesToUpload.push(docu);                
        }
    }
    $event.target.value = null;
  }

  remove(index) {
    this.filesToUpload.splice(index, 1);
    let conError = 0;
    for (let x1 = 0; x1 < this.filesToUpload.length; x1++) {
        if(this.filesToUpload[x1].error!==""){
            conError++
        }
    }
    if(conError>0){
        this.banderaErrores = true;            
    }else{
        this.banderaErrores = false;            
    }
  }

  removeAll() {
      this.filesToUpload.splice(0);
      this.banderaErrores = false;
      this.vistaCarga = true;
  }

  guardarArchivos(){
    this.archivosLength = this.filesToUpload.length;
    console.log("Inicia guardado con archivosLength:"+this.archivosLength+" y count:"+this.count);
    for(let x=0; x<this.filesToUpload.length;x++){
        this.saveFiles(this.filesToUpload[x].file);
    }
  }

  saveFiles(file:File){
    if(this.folder.path=="Home"){
        this.pathFolder = this.folder.id;
    } else {
        this.pathFolder = this.folder.path + "/" + this.folder.name;
    }
    
    let files:Files = new Files;
    files.idFolder = this.idFolder;
    files.name = file.name;
    files.type = file.type;
    files.size = file.size;
    files.path = this.pathFolder + "/" + file.name
    this._proyectDetailsService.addFile(files).subscribe(response => {
        console.log(response);
        this.uploadFisicFiles(file);
    });
  }

  uploadFisicFiles(file:File) {
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('url', this.pathFolder);
    console.log(this.pathFolder);
    console.log("Nombre de archivo",file.name);
    let prueba = this._proyectDetailsService.addFisicFile(formData).subscribe(response => {
        console.log("count:"+this.count+" archivosLength:"+this.archivosLength);
        if(this.count == this.archivosLength){
            this.fileEvent.emit();
            console.log("Se envia el emit");
        }
        this.count = this.count +1;
    });
  }
}
