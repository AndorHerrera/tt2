import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  proys = [{title: '¿Qué es un software point?', url: 'esta', img:'h3.jpg'},
  {title: 'Ayuda', url: 'esta', img:'h2.jpg'},
  {title: 'Tutorial', url: 'esta', img:'h1.jpg'},
  {title: 'Trabajo colaborativo', url: 'esta', img:'cg.jpg'},
  {title: '¿Cómo calificamos los proyectos?', url: 'esta', img:'sq.png'}];

  constructor() { }

  ngOnInit() {
  }

}
