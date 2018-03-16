import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;

  constructor() { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [ 'ID','Nombre','Ultima Actualización','Estado','Acciones'],
      dataRows: [
          ['Módulos de Tienda Online',          '21/08/2017', 'Publicado'],
          ['Módulo de Iniciar Sesión',          '21/08/2017', 'Validando'],
          ['Proyecto Banco',                    '21/08/2017', 'Aprobado'],
          ['Drag & drop',                       '21/08/2017', 'Validando'],
          ['Proyecto Carrito de compras',       '21/08/2017', 'No aprobado'],
          ['Utilización de la API Google Maps', '21/08/2017', 'Validando']
      ]
    };
    this.tableData2 = {
        headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
        dataRows: [
            ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
            ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
            ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
            ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
            ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
            ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
        ]
    };
  }

}
