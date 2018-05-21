import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { ProyectsService } from '../proyects/proyects.service';
import { Proyect } from '../_models/proyect.model';
import { BodyCharts } from '../_models/bodyCharts.model';
import { ChartsService } from '../charts/charts.service';
import { SonarComponent } from '../_models/sonarComponent.model';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  constructor(private _activaRoute: ActivatedRoute,private _proyectDetailsService: ProyectDetailsService,
              private _proyectsService: ProyectsService,private _chartsService: ChartsService, private router:Router) { }

  idProyect:string;

  salario:number=15000;    // Salario promedio por persona para desarrollo organico
  salarioTotal:number=15000;   // Salario total del equipo
  costoHreal:number=0;     // Numero de personas reales en el equipo
  precioSP:number=0;       // Precio en Software Points
  precioMarket:number=0;       // Precio en Software Points
  commission:number=0;       // Precio en Software Points
  costoH:number=0;         // Personas necesarias para realiar el proyecto
  esfuerzo:number=0;       // Esfuerzo requerido del proyecto
  metricaSonar:number=0;   // Metrica de Evaluacion Sonar
  tdev:number=0;          // Tiempo de desarrollo del proyecto
  ncloc:number=0;         // Lineas de codigo Efectivas
  // Constantes con el submodelo Organico
  a:number=2.40;
  b:number=2.05;
  c:number=2.5;
  d:number=2.38;
  // Metricas Sonar
  promedioMetricas:number=0; // Total de promedio
  mantenibilidad:number=0;   // Promedio mantenibilidad
  seguridad:number=0;        // Promedio Seguridad
  confiabilidad:number=0;    // Promedio Confiabilidad
  noDuplicados:number=0;     // Promedio noDuplicados
  coberturaPruebas:number=0; // Promedio Cobertura de Pruebas
  blockLoader:boolean=true;

  folder:Folder = new Folder;
  proyecto:Proyect = new Proyect;
  sonarComponent:SonarComponent = new SonarComponent;
  sonarComponentDos:SonarComponent = new SonarComponent;


  ngOnInit() {
    this._activaRoute.params.subscribe( params => {
      this.idProyect = params['id'];

      this.getProyect();
    });
  }

  getProyect(){
    this._proyectsService.getProyect(this.idProyect).subscribe(response => {
      this.proyecto = response;
      this.getFolder();
    });
  }

  getFolder(){
    this._proyectDetailsService.getFolder(this.idProyect).subscribe(response => {
      this.folder = response[0];
      this.getMesuares();
    });
  }

  getMesuares(){
    this._chartsService.getMesuares(this.folder.id).subscribe(response => {
  	  this.sonarComponent = response;
  	  this.getParameters();
    });
  }

  getParameters(){
    for(let x=0; x < this.sonarComponent.component.measures.length; x++){
      if(this.sonarComponent.component.measures[x].metric=="ncloc"){
        this.ncloc = +this.sonarComponent.component.measures[x].value;
      } else if(this.sonarComponent.component.measures[x].metric=="duplicated_lines_density"){
        let duplicados = +this.sonarComponent.component.measures[x].value;
        this.noDuplicados = 100 - duplicados;
      } else if (this.sonarComponent.component.measures[x].metric=="coverage"){
        this.coberturaPruebas = +this.sonarComponent.component.measures[x].value;
      } else if (this.sonarComponent.component.measures[x].metric=="reliability_rating"){
        if(this.sonarComponent.component.measures[x].value=="5.0")
        this.confiabilidad=20;
        if(this.sonarComponent.component.measures[x].value=="4.0")
        this.confiabilidad=40;
        if(this.sonarComponent.component.measures[x].value=="3.0")
        this.confiabilidad=60;
        if(this.sonarComponent.component.measures[x].value=="2.0")
        this.confiabilidad=80;
        if(this.sonarComponent.component.measures[x].value=="1.0")
        this.confiabilidad=100;
      } else if (this.sonarComponent.component.measures[x].metric=="sqale_rating"){
        if(this.sonarComponent.component.measures[x].value=="5.0")
        this.mantenibilidad=20;
        if(this.sonarComponent.component.measures[x].value=="4.0")
        this.mantenibilidad=40;
        if(this.sonarComponent.component.measures[x].value=="3.0")
        this.mantenibilidad=60;
        if(this.sonarComponent.component.measures[x].value=="2.0")
        this.mantenibilidad=80;
        if(this.sonarComponent.component.measures[x].value=="1.0")
        this.mantenibilidad=100;
      } else if (this.sonarComponent.component.measures[x].metric=="security_rating") {
        if(this.sonarComponent.component.measures[x].value=="5.0")
        this.seguridad=20;
        if(this.sonarComponent.component.measures[x].value=="4.0")
        this.seguridad=40;
        if(this.sonarComponent.component.measures[x].value=="3.0")
        this.seguridad=60;
        if(this.sonarComponent.component.measures[x].value=="2.0")
        this.seguridad=80;
        if(this.sonarComponent.component.measures[x].value=="1.0")
        this.seguridad=100;
      }
    }
    this.getPrecio();
  }


  getpromedioMetricas(){
    if(this.coberturaPruebas>0){
      this.promedioMetricas = Math.round((this.mantenibilidad+this.seguridad+this.confiabilidad+this.noDuplicados+this.coberturaPruebas)/5)*0.01;
      console.log("Prom"+this.promedioMetricas);
    } else {
      this.promedioMetricas = Math.round((this.mantenibilidad+this.seguridad+this.confiabilidad+this.noDuplicados)/4)*0.01;
      console.log("Prom"+this.promedioMetricas);
    }
    
  }

  getEsfuerzo(){
    let kncloc = (this.ncloc +1)/10000;
    console.log("kncloc:"+this.ncloc);
    this.esfuerzo = kncloc * this.promedioMetricas;
    console.log("Esfuerzo:"+this.esfuerzo);
  }

  getTiempo(){
    this.tdev = this.c * (this.esfuerzo*this.d)*1000;
    console.log("TDEV:"+this.tdev);
  }

  getPersonas(){
    this.costoH = this.esfuerzo * 1.3;
    console.log("costoh:"+this.costoH);    
  }

  getPrecio(){
    this.getpromedioMetricas();
    this.getEsfuerzo();
    this.getTiempo();
    this.getPersonas();
    this.precioSP = Math.round(this.costoH * this.salarioTotal);
    console.log("precioSP:"+this.precioSP);    
    this.precioMarket = Math.round(this.precioSP + (this.precioSP*0.25));
    console.log("precioMarket:"+this.precioMarket);    
    this.commission = Math.round(this.precioSP*0.15);
    console.log("commission:"+this.commission);    
    this.blockLoader=false;
  }

  publicar(){
    this.blockLoader=true;
    this.proyecto.status = "Publicado";
    this.proyecto.price = this.precioSP;
    this.proyecto.commission = this.commission;
    this.proyecto.priceMarket = this.precioMarket;
    this._proyectsService.editProyect(this.proyecto,this.proyecto.id).subscribe(response => {
      console.log(response);
      this.blockLoader=false;
      this.router.navigate(['/proyects']);
    });   
  }

  round(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

}
