import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidandoService } from './validando.service';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { ProyectsService } from '../proyects/proyects.service';
import { Proyect } from '../_models/proyect.model';
import { SonarComponent } from '../_models/sonarComponent.model';
import { ChartsService } from '../charts/charts.service';
import { FileSonar } from '../_models/fileSonar.model';

@Component({
  selector: 'app-validando',
  templateUrl: './validando.component.html',
  styleUrls: ['./validando.component.scss']
})
export class ValidandoComponent implements OnInit {

  constructor(private _activaRoute: ActivatedRoute, private _validandoService:ValidandoService, 
    private _proyectDetailsService: ProyectDetailsService,private _proyectsService: ProyectsService,
    private router:Router,private _chartsService: ChartsService) { }

  idProyect:string;
  idFolderMaster:string;  
  responseScaneo:string;
  proyect:Proyect;
  sonarComponent:SonarComponent = new SonarComponent;

  ngOnInit() {
    this._activaRoute.params.subscribe( params => {
      this.idProyect = params['id'];
      this._proyectsService.getProyect(this.idProyect).subscribe(response => {
        this.proyect = response;
        this._proyectDetailsService.getFolder(this.idProyect).subscribe(response => {
           let folder:Folder = response[0];
           if(folder.id!=undefined){
              this.idFolderMaster = folder.id;
              let formData: FormData = new FormData();
              formData.append('key',this.idFolderMaster);
              formData.append('name',this.proyect.title);
              formData.append('path',"path");
              formData.append('version',this.proyect.version);
              console.log("Nombre Proyecto"+this.proyect.title);
              this.creaProperties(formData);
           }
        });
      });
    });
  }

  creaProperties(formData: FormData){
    this._validandoService.createProperties(formData).subscribe(response => {
      console.log(response);
      this.escanea();
    });
  }

  escanea(){
    this._validandoService.escaneaProyecto(this.idFolderMaster).subscribe(response => {
      this.responseScaneo = response;
        this.getMesuares();
    });
  }

  
  getMesuares(){
    this._chartsService.getMesuares(this.idFolderMaster).subscribe(response => {
      console.log("Esta es la respuesta del servicio metricas:"+response);
      this.sonarComponent = response;
      console.log
      if(this.sonarComponent!=undefined){
        console.log("Entra al if sonarComponent no undefined");
        for(let x=0; x < this.sonarComponent.component.measures.length; x++){
          if (this.sonarComponent.component.measures[x].metric=="alert_status"){
            console.log("Entra al if de alert_status");
            if(this.sonarComponent.component.measures[x].value=="OK"){
              this.proyect.status = "Aprobado";
            } else {
              this.proyect.status = "Descartado";
            }
            this.proyect.sonar=true;
            this.editProyect();
         }
        }
      } else {
        console.log("Entra al else sonarcomponent undefined");
        this.editProyect();   
      }
    });
  }

  editProyect(){ 
    console.log("Entra a editar proyect con:"+this.proyect);
    this._proyectsService.editProyect(this.proyect,this.idProyect).subscribe(response => {
      console.log(response);
      this.router.navigate(['/infoCharts',this.idFolderMaster]);      
    });
  }

}
