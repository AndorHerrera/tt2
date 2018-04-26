import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  proys = [{title: '¿Qué es un software point?', url: 'https://www.youtube.com/watch?v=O-8IYWMltIg', img:'h3.jpg'},
  {title: 'Ayuda', url: 'https://www.youtube.com/watch?v=EgFFAeG5BBQ', img:'h2.jpg'},
  {title: 'Tutorial', url: 'https://www.youtube.com/watch?v=O-8IYWMltIg', img:'h1.jpg'},
  {title: 'Trabajo colaborativo', url: 'https://www.youtube.com/watch?v=EgFFAeG5BBQ', img:'cg.jpg'},
  {title: '¿Cómo calificamos los proyectos?', url: 'https://www.youtube.com/watch?v=O-8IYWMltIg', img:'sq.png'}];

  constructor() { }

  ngOnInit() {
  }

}
