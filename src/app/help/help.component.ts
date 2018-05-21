import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  proys = [{title: '¿Qué es un software point?', url: 'O-8IYWMltIg', img:'h3.jpg'},
  {title: 'Ayuda', url: 'EgFFAeG5BBQ', img:'h2.jpg'},
  {title: 'Tutorial', url: 'O-8IYWMltIg', img:'h1.jpg'},
  {title: 'Trabajo colaborativo', url: 'EgFFAeG5BBQ', img:'cg.jpg'},
  {title: '¿Cómo calificamos los proyectos?', url: 'O-8IYWMltIg', img:'sq.png'}];

  vUrl = "EgFFAeG5BBQ";

  constructor() { }

  ngOnInit() {
  }

  openModal(url: string){
    this.vUrl=url;
    console.log(this.vUrl);
  }
}
