import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Homework } from 'app/_models/homework.model';
import { User } from '../../../_models/user.model';
import { Kanban } from '../../../_models/kanban.model';
import { KanbanService } from '../../../canvas/canvas.service';
import { UserService } from 'app/user/user.service';
import { InicioService } from '../../../inicio/inicio.service';
import { SessionService } from '../../../services/sessionService.service';
import { MovementsService } from '../../../movements/movements.service';
import { Movement } from '../../../_models/movements.model';

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

  constructor(private _kanbanService: KanbanService, private _userService: UserService,  
              private _infoService:InicioService,  private _sessionService: SessionService,private _movementesService:MovementsService) { }

  ngOnInit() {
    console.log("a"+this.asignados);
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
        this._infoService.getUserBySub(this._sessionService.getUser().sub).subscribe(response => {
          this.editableItem.author = response[0];
          this.editableItem.status = "Por Hacer";
          this._kanbanService.addHomework(this.editableItem).subscribe(response => {
            this.pushNotification();
          });
        });
    }

  }

  onChangeObj(newObj) {
    this.editableItem.assigned = newObj;
  }

  pushNotification(){
    let movimiento: Movement = new Movement();
    movimiento.sub = this.editableItem.assigned.sub;
    movimiento.type = "Tarea Asignada";
    movimiento.description = this.editableItem.author.nickname + " te asigno la tarea "+ this.editableItem.title;
    this._movementesService.addMovements(movimiento).subscribe(response => {
      this.homeworkEvent.emit();
    });
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
