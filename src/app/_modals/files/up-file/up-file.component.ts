import { Component, OnInit } from '@angular/core';
import { DocumentFile } from '../../../../models/documenfile.model';

@Component({
  selector: 'app-up-file',
  templateUrl: './up-file.component.html',
  styleUrls: ['./up-file.component.scss']
})
export class UpFileComponent implements OnInit {

  public vistaCarga: boolean = true;
  public banderaErrores: boolean = false;
  isLoading: boolean = false;
  public filesToUpload: Array<DocumentFile> = new Array<DocumentFile>();
  public namesFiles: Array<string> = new Array <string>();

  constructor() { }

  ngOnInit() {
  }

  selectFile($event) {
    this.vistaCarga = true;        
    this.isLoading = false;
    this.banderaErrores = false;
    let files = $event.target.files || $event.srcElement.files;
    for (let x1 = 0; x1 < files.length; x1++) {
        var error = "";
        if (files[x1].type === "application/pdf") {
            if(files[x1].size > 5 * 1024 * 1024){
                error = 'Error: El documento no debe de exceder los 5mb';
                this.banderaErrores = true;
            }
        } else {
            error = 'Error: Solo se pueden cargar archivos PDF';
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

}
