import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  //proys = ['UNO','DOS','TRES','CUATRO','CINCO'];

  data = [{id: '123', title: 'Proyecto web', desc: 'Un proyecto donde se desarrolla un sistema web en el los usuarios se pueden registrar en una red social', points: 300, img: 'c2.jpg', tags: ['Web', 'Red social'] },
  {id: '746', title: 'Proyecto backend', desc: 'Un proyecto donde se modela una base de datos de usuarios de una biblioteca', points: 290, img: 'c1.jpg', tags: ['Base de datos', 'Java']},
    {id: '243', title: 'Proyecto mobil', desc: 'Un proyecto donde el usuario prodrá ver en un mapa su posición actual y en movimiento', points: 200, img: 'c3.jpeg', tags: ['Android', 'GPS', 'Google Maps']},
    {id: '633', title: 'Proyecto java', desc: 'Un proyecto donde hacemos uso de las funciones de cadenas definidas para los objetos String', points: 235, img: 'c4.jpg', tags: ['Java']},
    {id: '633', title: 'Proyecto java', desc: 'Un proyecto donde hacemos uso de las funciones de cadenas definidas para los objetos String', points: 310, img: 'c4.jpg', tags: ['Java']},
    {id: '746', title: 'Proyecto backend', desc: 'Un proyecto donde se modela una base de datos de usuarios de una biblioteca', points: 290, img: 'c1.jpg', tags: ['Base de datos', 'Java']},
    {id: '653', title: 'Proyecto frontend', desc: 'Un proyecto donde se crea una pagina responsiva en la que se muestra un formulario', points: 430, img: 'hqdefault.jpg', tags: ['CSS', 'Bootstrap']},
    {id: '123', title: 'Proyecto web', desc: 'Un proyecto donde se desarrolla un sistema web en el los usuarios se pueden registrar en una red social', points: 300, img: 'c2.jpg', tags: ['Web', 'Red social'] },
    {id: '633', title: 'Proyecto java', desc: 'Un proyecto donde hacemos uso de las funciones de cadenas definidas para los objetos String', points: 450, img: 'c4.jpg', tags: ['Java']},
    {id: '653', title: 'Proyecto frontend', desc: 'Un proyecto donde se crea una pagina responsiva en la que se muestra un formulario', points: 430, img: 'hqdefault.jpg', tags: ['CSS', 'Bootstrap']}];

  proys = this.data;
  res = [];
  
  constructor() { }

  ngOnInit() {

  }

  addTodo(term: string): void {
    console.log(term);
    this.res = [];
    for(var i=0; i < this.data.length; i++) {
      if(this.data[i].title.indexOf(term) >= 0){
        console.log(this.data[i]);
        this.res.push(this.data[i]);
      }
    }
    this.proys = this.res;
  }

}
