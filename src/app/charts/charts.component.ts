import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { ChartsService } from './charts.service';
import { ActivatedRoute } from '@angular/router';
import { BodyMeasure } from '../_models/bodyMeasure.model';
import { BodyCharts } from '../_models/bodyCharts.model';
import { Constants } from 'app/constants.class';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];


  ////// Grafica PASTEL //////////////
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  ////// Grafica RADAR //////////////
  public radarChartLabels:string[] = [];
  public radarChartData:any = [];
  public radarChartType:string = 'radar';
  public radarChartColors:Array<any> = [ { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }]
  ////// Grafica POLAR AREA //////////////
  public polarAreaChartLabels:string[] = ['Criticas', 'Mayores', 'Menores'];
  public polarAreaChartData:number[] = [];
  public polarAreaLegend:boolean = true;
  public polarAreaChartType:string = 'polarArea';
  ////// Grafica Barras //////////////
  public barChartLabels:string[] = ['Esfuerzo'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [];
  ////// Grafica Dona //////////////
  public doughnutChartLabels:string[] = ['Comentadas', 'Sin Pruebas', 'Duplicadas','Efectivas'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  idProyect:string;
  bodyCharts:BodyCharts;
  bodyMeasure:BodyMeasure = new BodyMeasure;
  blockLoader:boolean=true;
  public tableData1: TableData;

constructor(private _chartsService: ChartsService,private _activaRoute: ActivatedRoute) { }

  ngOnInit() {
    this.bodyCharts = Constants.bodyCharts;
    this.tableData1 = {
      headerRow: [ 'Folders','Lienas Apestosas','Duplicados','Ncloc','Convergencia','Bugs','Vulnerabilidades'],
      dataRows: []
    };
    ////// Grafica PASTEL //////////////
    this.pieChartLabels = this.bodyCharts.lenguaLabels;
    this.pieChartData = this.bodyCharts.lenguaSeries;
    ////// Grafica RADAR //////////////
    this.radarChartLabels = ['Mantenibilidad', 'Confiabilidad', 'No Duplicados', 'Cobertura de Pruebas', 'Seguridad'];
    this.radarChartData = [ {data: this.bodyCharts.metricasRadar, label:"Codigo"}]; [100,60,97,0,0]
    this.radarChartType = 'radar';
    ////// Grafica POLAR //////////////
    this.polarAreaChartData = [this.bodyCharts.violacionesCriticas, this.bodyCharts.violacionesMenores, this.bodyCharts.violacionesMayores];
    ////// Grafica Barras //////////////   
    this.barChartData = [
      {data: [this.bodyCharts.esfuerzoRemediacionSeguridad], label: 'Seguridad'},
      {data: [this.bodyCharts.esfuerzoRemediacionConfiabilidad], label: 'Confiabilidad'},
      {data: [this.bodyCharts.esfuerzoRemediacionMantebilidad], label: 'Mantebilidad'}
    ];
    ////// Grafica Dona //////////////
    this.doughnutChartData = [this.bodyCharts.lineasComentadas, this.bodyCharts.lineasSinPruebas, this.bodyCharts.lineasDuplicadas,this.bodyCharts.ncloc];

    this.blockLoader = false;
  }





  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  

}
