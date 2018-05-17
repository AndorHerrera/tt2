import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MarketService } from '../market/market.service';
import { Proyect } from '../_models/proyect.model';
import { ChartsService } from '../charts/charts.service';
import { SonarComponent } from '../_models/sonarComponent.model';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { Mesuare } from '../_models/measure.model';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { SessionService } from '../services/sessionService.service';
import { User } from '../_models/user.model';


@Component({
  selector: 'app-marketdetail',
  templateUrl: './marketdetail.component.html',
  styleUrls: ['./marketdetail.component.scss']
})

export class MarketDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location,
    private marketService: MarketService,
    private chartService: ChartsService,
    private proyDetails: ProyectDetailsService,
    private router: Router,
    private userService: UserService,
    private _sessionService: SessionService) { }

  mID = 0;
  mProy = null;
  sID = "";
  proyId = "";
  dist;
  userID = "";
  proyEnabled = false;


  /*proys = [{id: '123', title: 'Proyecto web', desc: 'Un proyecto donde se desarrolla un sistema web en el los usuarios se pueden registrar en una red social', points: 300, img: 'c2.jpg', tags: ['Web', 'Red social'] },
    {id: '243', title: 'Proyecto mobil', desc: 'Un proyecto donde el usuario prodrá ver en un mapa su posición actual y en movimiento', points: 200, img: 'c3.jpeg', tags: ['Android', 'GPS', 'Google Maps']},
    {id: '633', title: 'Proyecto java', desc: 'Un proyecto donde hacemos uso de las funciones de cadenas definidas para los objetos String', points: 310, img: 'c4.jpg', tags: ['Java']},
    {id: '746', title: 'Proyecto backend', desc: 'Un proyecto donde se modela una base de datos de usuarios de una biblioteca', points: 270, img: 'c1.jpg', tags: ['Base de datos', 'Java']},
    {id: '653', title: 'Proyecto frontend', desc: 'Un proyecto donde se crea una pagina responsiva en la que se muestra un formulario', points: 430, img: 'hqdefault.jpg', tags: ['CSS', 'Bootstrap']}];*/

  proys: Proyect;
  component: SonarComponent;
  folder: Folder[]=[];
  measure: Mesuare[]=[];
  mMeasure: Mesuare[]=[];
  nMeasure: Mesuare;  
  mUser: User;

  ngOnInit() {
    this.getProyID();
  }

  getProyID(): void {
    this.route.params.subscribe( params => {
      this.sID = params['id'];
      console.log(this.sID);
      this.getProy();
    });


    /*for(var i=0; i < this.proys.length; i++) {
      if(String(id)==this.proys[i].id){
        this.mProy = this.proys[i];
      }
    }*/
    /*this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);*/
  }

  getProy(): void{
    this.marketService.getProyectDetail(this.sID).subscribe(response => {
      this.proys = response;
      console.log(this.proys.users);
      console.log(this.proys.title);
      this.getId();
    });
  }

  getChar(): void {
    this.chartService.getMesuares(this.proyId).subscribe(response => {
      this.component = response;
      console.log(this.component.component.measures);
      this.measure = this.component.component.measures;
      this.measure.forEach(element => {
        /*if(element.metric=="code_smells" || element.metric=="bugs"
          //|| element.metric=="security_rating" || element.metric=="duplicated_blocks"
          || element.metric=="ncloc" || element.metric=="ncloc_language_distribution"){ 
          console.log(element.metric+" "+element.value);
          this.mMeasure.push(element);
        }*/
        
        this.nMeasure = new Mesuare();
        if(element.metric=="code_smells") {
          this.nMeasure.value=element.value;
          this.nMeasure.metric="Lineas apestosas";
          this.mMeasure.push(this.nMeasure);
        } else if(element.metric=="bugs") {
          this.nMeasure.value=element.value;
          this.nMeasure.metric="Bugs";
          this.mMeasure.push(this.nMeasure);
        } else if(element.metric=="ncloc") {
          this.nMeasure.value=element.value;
          this.nMeasure.metric="Lineas de código";
          this.mMeasure.push(this.nMeasure);
        } else if(element.metric=="ncloc_language_distribution") {
          this.nMeasure.value=element.value.split("=")[0];
          this.nMeasure.metric="Distribucion";
          this.mMeasure.push(this.nMeasure);
        }

      });
      console.log(this.mMeasure);
      this.getUser();
    });
  }

  getId(): void {
    this.proyDetails.getFolder(this.sID).subscribe(response => {
      this.folder = response;
      this.proyId = this.folder[0].id;
      this.getChar();
      console.log("getchar");
      console.log(this.proyId);
    });
  }

  goBack(): void {
    this.location.back();
  }

  getUser(): void {
    if(this._sessionService.getUser()!=null){
      this.userID=this._sessionService.getUser().id;
      this.userService.getUser(this.userID).subscribe(response => {
        this.mUser=response;
        console.log(response.sp);
        console.log(this.mUser.sp);
      });
    }
  }

  verGraficas(idProyecto:string) {
    console.log("click");
    this.proyDetails.getFolder(idProyecto).subscribe(response => {
      let folder:Folder = response[0];
      if(folder.id!=undefined){
        this.router.navigate(['/infoCharts',folder.id]);      
      }
    });
  }

  obtener() {

  }

}
