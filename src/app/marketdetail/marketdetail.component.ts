import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-marketdetail',
  templateUrl: './marketdetail.component.html',
  styleUrls: ['./marketdetail.component.scss']
})
export class MarketDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location) { }

  mID = 0;
  mProy = null;

  proys = [{id: '123', title: 'Proyecto web', desc: 'Un proyecto donde se desarrolla un sistema web en el los usuarios se pueden registrar en una red social', points: 300, img: 'c2.jpg', tags: ['Web', 'Red social'] },
    {id: '243', title: 'Proyecto mobil', desc: 'Un proyecto donde el usuario prodrá ver en un mapa su posición actual y en movimiento', points: 200, img: 'c3.jpeg', tags: ['Android', 'GPS', 'Google Maps']},
    {id: '633', title: 'Proyecto java', desc: 'Un proyecto donde hacemos uso de las funciones de cadenas definidas para los objetos String', points: 310, img: 'c4.jpg', tags: ['Java']},
    {id: '746', title: 'Proyecto backend', desc: 'Un proyecto donde se modela una base de datos de usuarios de una biblioteca', points: 270, img: 'c1.jpg', tags: ['Base de datos', 'Java']},
    {id: '653', title: 'Proyecto frontend', desc: 'Un proyecto donde se crea una pagina responsiva en la que se muestra un formulario', points: 430, img: 'hqdefault.jpg', tags: ['CSS', 'Bootstrap']}];

  ngOnInit() {
    this.getProy();
  }

  getProy(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.mID = +this.route.snapshot.paramMap.get('id');

    for(var i=0; i < this.proys.length; i++) {
      if(String(id)==this.proys[i].id){
        this.mProy = this.proys[i];
      }
    }
    /*this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);*/
  }

  goBack(): void {
    this.location.back();
  }

}
