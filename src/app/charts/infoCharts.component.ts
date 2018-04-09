import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { ChartsService } from './charts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMeasure } from '../_models/bodyMeasure.model';
import { BodyCharts } from '../_models/bodyCharts.model';
import { Constants } from 'app/constants.class';
import { BodyChartsItems } from '../_models/bodyIChartsItems.model';
import { SonarComponent } from '../_models/sonarComponent.model';
import { FolderSonar } from '../_models/folderSonar.model';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-info-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class InfoChartsComponent implements OnInit {

  idProyect:string;
  public tableData1: TableData;
  sonarComponent:SonarComponent = new SonarComponent;
  sonarComponentDos:SonarComponent = new SonarComponent;
  sonarComponentFolders:SonarComponent = new SonarComponent;
  bodyCharts:BodyCharts = new BodyCharts;
  blockLoader:boolean = true;
  colores:string [] = ['fa fa-circle text-info','fa fa-circle text-success','fa fa-circle text-warning',
                      'fa fa-circle text-danger','fa fa-circle text-info','fa fa-circle text-success',
                      'fa fa-circle text-warning','fa fa-circle text-danger','fa fa-circle text-info',
                      'fa fa-circle text-success','fa fa-circle text-warning','fa fa-circle text-danger'];

  constructor(private _chartsService: ChartsService,private _activaRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [],
      dataRows: []
    };
    this._activaRoute.params.subscribe( params => {
    this.idProyect = params['id'];
    this.bodyCharts.idProyect = this.idProyect;
  	this.getMesuares();
    });
  }
  
  getMesuares(){
    this._chartsService.getMesuares(this.idProyect).subscribe(response => {
  	  this.sonarComponent = response;
  	  this._chartsService.getMedidas(this.idProyect).subscribe(response => {
        this.sonarComponentDos = response;
        this._chartsService.getFolders(this.idProyect).subscribe(response => {
          this.sonarComponentFolders = response;
          this.createGraphycs();
        });
      });
    });
  }

  createGraphycs(){
    this.bodyCharts.metricasRadar = [0,0,0,0,0];
    this.bodyCharts.folders = [];
    
  	for(let x=0; x < this.sonarComponent.component.measures.length; x++){
  	  if(this.sonarComponent.component.measures[x].metric=="bugs"){
  		this.bodyCharts.bugs = +this.sonarComponent.component.measures[x].value;
  	  } else if (this.sonarComponent.component.measures[x].metric=="code_smells"){
  		this.bodyCharts.apestosas = +this.sonarComponent.component.measures[x].value;
  	  } else if (this.sonarComponent.component.measures[x].metric=="vulnerabilities"){
  		this.bodyCharts.vulnerabilidades = +this.sonarComponent.component.measures[x].value;
  	  } else if (this.sonarComponent.component.measures[x].metric=="duplicated_lines_density"){
      this.bodyCharts.duplicados = +this.sonarComponent.component.measures[x].value;
      this.bodyCharts.metricasRadar[2]=100-this.bodyCharts.duplicados;
  	  } else if (this.sonarComponent.component.measures[x].metric=="ncloc"){
      this.bodyCharts.ncloc =+this.sonarComponent.component.measures[x].value;
      } else if (this.sonarComponent.component.measures[x].metric=="ncloc_language_distribution"){
        this.bodyCharts.lenguaItems = [];
        this.bodyCharts.lenguaSeries = [];
        this.bodyCharts.lenguaLabels = [];
        let valor:string = this.sonarComponent.component.measures[x].value
        let z = valor.split(";");
        for(let i=0; i <z.length; i++){
          let item:BodyChartsItems = new BodyChartsItems;
          let sep = z[i].split("=");
          this.bodyCharts.lenguaLabels.push(sep[0]);
          this.bodyCharts.lenguaSeries.push(+sep[1]);
        }
      } else if (this.sonarComponent.component.measures[x].metric=="alert_status"){
         if(this.sonarComponent.component.measures[x].value=="OK"){
          this.bodyCharts.status = "Proyecto Aprobado";
          this.bodyCharts.statusFlad = true;
         } else {
          this.bodyCharts.status = "Proyecto No Aprobado";
          this.bodyCharts.statusFlad = false;
         }
      } else if (this.sonarComponent.component.measures[x].metric=="sqale_index"){
        this.bodyCharts.days =+this.sonarComponent.component.measures[x].value;
      } else if (this.sonarComponent.component.measures[x].metric=="coverage"){
        this.bodyCharts.pruebas =+this.sonarComponent.component.measures[x].value;
        this.bodyCharts.metricasRadar[3]=this.bodyCharts.pruebas;
      } else if (this.sonarComponent.component.measures[x].metric=="duplicated_blocks"){
        this.bodyCharts.bloques_repetidos =+this.sonarComponent.component.measures[x].value;
      } else if (this.sonarComponent.component.measures[x].metric=="reliability_rating"){
        this.bodyCharts.reliability =+this.sonarComponent.component.measures[x].value;
        if(this.sonarComponent.component.measures[x].value=="5.0")
        this.bodyCharts.metricasRadar[1]=20;
        if(this.sonarComponent.component.measures[x].value=="4.0")
        this.bodyCharts.metricasRadar[1]=40;
        if(this.sonarComponent.component.measures[x].value=="3.0")
        this.bodyCharts.metricasRadar[1]=60;
        if(this.sonarComponent.component.measures[x].value=="2.0")
        this.bodyCharts.metricasRadar[1]=80;
        if(this.sonarComponent.component.measures[x].value=="1.0")
        this.bodyCharts.metricasRadar[1]=100;
      } else if (this.sonarComponent.component.measures[x].metric=="sqale_rating"){
        this.bodyCharts.sqale =+this.sonarComponent.component.measures[x].value;
        if(this.sonarComponent.component.measures[x].value=="5.0")
        this.bodyCharts.metricasRadar[0]=20;
        if(this.sonarComponent.component.measures[x].value=="4.0")
        this.bodyCharts.metricasRadar[0]=40;
        if(this.sonarComponent.component.measures[x].value=="3.0")
        this.bodyCharts.metricasRadar[0]=60;
        if(this.sonarComponent.component.measures[x].value=="2.0")
        this.bodyCharts.metricasRadar[0]=80;
        if(this.sonarComponent.component.measures[x].value=="1.0")
        this.bodyCharts.metricasRadar[0]=100;
      }  else if (this.sonarComponent.component.measures[x].metric=="security_rating"){
        this.bodyCharts.security =+this.sonarComponent.component.measures[x].value;
        if(this.sonarComponent.component.measures[x].value=="5.0")
        this.bodyCharts.metricasRadar[4]=20;
        if(this.sonarComponent.component.measures[x].value=="4.0")
        this.bodyCharts.metricasRadar[4]=40;
        if(this.sonarComponent.component.measures[x].value=="3.0")
        this.bodyCharts.metricasRadar[4]=60;
        if(this.sonarComponent.component.measures[x].value=="2.0")
        this.bodyCharts.metricasRadar[4]=80;
        if(this.sonarComponent.component.measures[x].value=="1.0")
        this.bodyCharts.metricasRadar[4]=100;
      } 

    }

    for(let i=0; i < this.sonarComponentDos.component.measures.length; i++){
      if(this.sonarComponentDos.component.measures[i].metric=="comment_lines_density"){
      this.bodyCharts.densidadComentarios = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="duplicated_files"){
      this.bodyCharts.archivosDuplicados = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="security_remediation_effort"){
      this.bodyCharts.esfuerzoRemediacionSeguridad = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="complexity"){
      this.bodyCharts.complejidad = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="sqale_debt_ratio"){
      this.bodyCharts.costoRemediarCodigo = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="critical_violations"){
      this.bodyCharts.violacionesCriticas = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="reliability_remediation_effort"){
      this.bodyCharts.esfuerzoRemediacionConfiabilidad = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="violations"){
      this.bodyCharts.violaciones = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="lines"){
      this.bodyCharts.lineas = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="blocker_violations"){
      this.bodyCharts.violacionesBloques = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="files"){
      this.bodyCharts.archivos = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="classes"){
      this.bodyCharts.clases = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="open_issues"){
      this.bodyCharts.issuesAbiertos = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="statements"){
      this.bodyCharts.declaraciones = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="comment_lines"){
      this.bodyCharts.lineasComentadas = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="directories"){
      this.bodyCharts.directorios = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="cognitive_complexity"){
      this.bodyCharts.complejidadCognitiva = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="functions"){
      this.bodyCharts.funciones = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="effort_to_reach_maintainability_rating_a"){
      this.bodyCharts.esfuerzoRemediacionMantebilidad = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="uncovered_lines"){
      this.bodyCharts.lineasSinPruebas = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="minor_violations"){
      this.bodyCharts.violacionesMenores = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="major_violations"){
      this.bodyCharts.violacionesMayores = +this.sonarComponentDos.component.measures[i].value;
      } else if (this.sonarComponentDos.component.measures[i].metric=="duplicated_lines"){
      this.bodyCharts.lineasDuplicadas = +this.sonarComponentDos.component.measures[i].value;
      } 
    }

    for(let j=0; j < this.sonarComponentFolders.components.length; j++){
      let folder:FolderSonar = new FolderSonar;
      folder.id = this.sonarComponentFolders.components[j].id;
      let z = this.sonarComponentFolders.components[j].name.split("files/");
      folder.name = z[1];
      for(let w=0; w < this.sonarComponentFolders.components[j].measures.length; w++){
        if(this.sonarComponentFolders.components[j].measures[w].metric=="code_smells"){
         folder.lineasApestosas = +this.sonarComponentFolders.components[j].measures[w].value;
        } else if(this.sonarComponentFolders.components[j].measures[w].metric=="duplicated_lines_density"){
         folder.lineasDuplicadas = +this.sonarComponentFolders.components[j].measures[w].value;
        } else if(this.sonarComponentFolders.components[j].measures[w].metric=="ncloc"){
         folder.nloc = +this.sonarComponentFolders.components[j].measures[w].value;
        } else if(this.sonarComponentFolders.components[j].measures[w].metric=="coverage"){
         folder.coverage = +this.sonarComponentFolders.components[j].measures[w].value;
        } else if(this.sonarComponentFolders.components[j].measures[w].metric=="bugs"){
         folder.bugs = +this.sonarComponentFolders.components[j].measures[w].value;
        } else if(this.sonarComponentFolders.components[j].measures[w].metric=="vulnerabilities"){
         folder.vulnerabilities = +this.sonarComponentFolders.components[j].measures[w].value;
        }
      }
      this.bodyCharts.folders.push(folder);

    }

    this.verGraficas();
  }

  verGraficas() {
    Constants.bodyCharts = new BodyCharts;
    Constants.bodyCharts = this.bodyCharts;
    this.router.navigate(['/charts']);
  }

}
