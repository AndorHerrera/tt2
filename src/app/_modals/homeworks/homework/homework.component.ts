import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Homework } from 'app/_models/homework.model';
import { User } from '../../../_models/user.model';
import { Kanban } from '../../../_models/kanban.model';
import { KanbanService } from '../../../canvas/canvas.service';
import { UserService } from 'app/user/user.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {

  editableItem:Homework = new Homework;
  id:string;
  idAsignado:string;
  idAutor:string;
  titulo:string;
  descripcion:string;
  prioridad:string;
  status:string;
  fechaEntrega:Date;
  asignado:User;
  autor:User = new User;
  accion:boolean = false; // Agregar por default
  kanban:Kanban;
  asignados:User[]=[];

  @Output()
  homeworkEvent = new EventEmitter();

  constructor(private _kanbanService: KanbanService, private _userService: UserService) { }

  ngOnInit() {
  }

  guardar(){
    this.editableItem.title = this.titulo;
    this.editableItem.priority = this.prioridad;
    this.editableItem.deliveryDate = this.fechaEntrega;
    this.editableItem.description = this.descripcion;
    this.editableItem.author = this.autor;
    this.editableItem.kanban = this.kanban;
    this.editableItem.status = this.status;
    this.editableItem.idKanban = this.kanban.id; //Falta llenarlo de la pestaña anterior

    if(this.accion){ // Editar
      this.editableItem.id = this.id;
      this._kanbanService.editHomework(this.editableItem,this.id).subscribe(response => {
        console.log("Termino la modificacion");
        this.homeworkEvent.emit();
      });
    }else{ // Agregar
      if(this.editableItem!=undefined)
        this.editableItem.id = undefined;
      let autorSesion:User = new User;
      //autorSesion.id = "43fe9681-dd53-4bb4-9bfe-15fe9633ad23"
      autorSesion.name = "Salomon";
      autorSesion.fatherLastName = "Olmedo";
      autorSesion.motherLastName = "Garcia";
     /*
      autorSesion.phone = "5533887728"
      autorSesion.email = "beko@gmail.com";
      autorSesion.gender = "M";
      autorSesion.password = "12345";
      autorSesion.birthday =  new Date("2018-01-17T02:03:51.000Z");
      autorSesion.activo = true;
      autorSesion.fechaCreacion = new Date("2018-03-11T20:27:06.000Z");
      autorSesion.fechaModificacion = new Date("2018-03-11T20:27:06.000Z");
*/
      this.editableItem.author = autorSesion; 
      this.editableItem.status = "Por Hacer";


      this._kanbanService.addHomework(this.editableItem).subscribe(response => {
        this.homeworkEvent.emit();
      });
    }

  }

  onChangeObj(newObj) {
    console.log(newObj);
    this.editableItem.assigned = newObj;
    console.log(this.editableItem.assigned);
  }

  removeAll(){
    this.titulo="";
    this.descripcion="";
    this.prioridad="";
    this.fechaEntrega=null;
    this.asignado=null;
    this.accion=false;
  }
  
}
