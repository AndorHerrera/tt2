import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectDetailsService } from './proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { BodyFolder } from '../_models/bodyFolder.model';
import { Files } from '../_models/files.model';
import { UpFileComponent } from '../_modals/files/up-file/up-file.component';
import { FolderComponent } from '../_modals/folders/folder/folder.component';
import { Ruta } from '../_models/rutas.model';
declare var $:any;
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-proyectdetails',
  templateUrl: './proyectdetails.component.html',
  styleUrls: ['./proyectdetails.component.scss']
})
export class ProyectdetailsComponent implements OnInit {
  
  public tableData1: TableData;
  idFolder:string="";
  folder:Folder;
  cuerpoFolder:BodyFolder[] = [];
  rutas:Ruta[]=[];

  padreLabel:string;
  padreRoot:string;

  @ViewChild(UpFileComponent)
  modalUpFile: UpFileComponent;

  @ViewChild(FolderComponent)
  modalFolder: FolderComponent;

  constructor(private _activaRoute: ActivatedRoute,private _proyectDetailsService: ProyectDetailsService,private router:Router) {

  }

  ngOnInit() {
    this.cuerpoFolder = [];
    this.tableData1 = {
      headerRow: ['Tipo','Tamaño','Creado','Acciones'],
      dataRows: []
    };
    this._activaRoute.params.subscribe( params => {
      this.idFolder = params['id'];
      this.getFolder();
    });
  }
  
  getFolder(){
    this.cuerpoFolder = [];
    this._proyectDetailsService.getFolderById(this.idFolder).subscribe(response => {
        this.cuerpoFolder = [];
        this.folder = response;
        console.log(this.folder);
        this.getFolders();
        this.analizaPath();
    });
  }

  getFolders(){
    this._proyectDetailsService.getFolder(this.folder.id).subscribe(response => {
      this.getFiles();
      for(let x=0; x < response.length; x++){
        this.cuerpoFolder.push(response[x]);
      }
    });
  }

  getFiles(){
    this._proyectDetailsService.getFiles(this.folder.id).subscribe(response => {
      for(let x=0; x < response.length; x++){
        this.cuerpoFolder.push(response[x]);
      }
    });
  }

  abrirCarpeta(idFolder:string) {
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/proyectDetails",idFolder]));
	}
 
  abrirArchivo(idFile:string) {
    console.log("Abrir archivo con id:"+idFile);
  }

  sendModalUploadFile(){ // Manda Datos a modal Proyects
    this.modalUpFile.idFolder = this.folder.id;
    this.modalUpFile.folder = this.folder;
    this.modalUpFile.count = 1;
    this.modalUpFile.archivosLength = 0;
  }

  sendModalFolder(){
    this.modalFolder.folder = this.folder;
    this.modalFolder.idFather = this.folder.id;
    this.modalFolder.nameFather = this.folder.name;
    this.modalFolder.idProyecto = this.folder.idProyect;
  }

  fileGuardado(){
    $.notify({
      icon: "pe-7s-diskette",
      message: "<b>ARCHIVO GUARDADO DE FORMA EXITOSA!!.</b>"
    },{
        type:'success',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
    this.getFolder();
  }

  folderGuardado(){
    $.notify({
      icon: "pe-7s-diskette",
      message: "<b>FOLDER CREADO DE FORMA EXITOSA!!.</b>"
    },{
        type:'success',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
    this.getFolder();
  }

  padreRerutn(){
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/proyectDetails",this.folder.idFather]));
  }

  analizaPath(){
    if(this.folder.path!="Home"){
      let paths = this.folder.path.split("/");
      let final = paths.length - 1;
      this.padreLabel = paths[final];
      this.padreRoot = this.folder.idFather;
      if(paths.length==1){
        this.padreLabel = "Home"
      }
    } else {
      this.padreLabel = "0"
    }
    
    
/*
    // Si tiene punto es ruta de archivo, si no es de folder
    if(path.indexOf(".")!=-1){
      let paths = path.split("/");
      let final = paths.length - 2;
      for(let i=0; i<paths.length; i++){
        let root:Ruta = new Ruta;
        root.name = paths[final];
        root.path = this.
      }
    } else {



    }
    "6a4aeff2-69aa-406d-be30-efefd9a85eb2/php"


    "6a4aeff2-69aa-406d-be30-efefd9a85eb2/php/util/idSSL.php"
    "6a4aeff2-69aa-406d-be30-efefd9a85eb2/views/forbidden.php"
    "6a4aeff2-69aa-406d-be30-efefd9a85eb2/php/Proyectos/mostrarAlumnos.php"

*/
  }

}