import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../_models/user.model';
import { KanbanService } from '../../canvas/canvas.service';
import { Kanban } from '../../_models/kanban.model';
import { ProyectsService } from '../../proyects/proyects.service';
import { MovementsService } from '../../movements/movements.service';
import { Movement } from '../../_models/movements.model';
import { SessionService } from '../../services/sessionService.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(private _userService:UserService, private _kanbanService:KanbanService, 
    private _proyectsService: ProyectsService, private _movementesService:MovementsService, private _sessionService: SessionService) { }

  listUsers:User[] = [];
  seleccionado:User;
  kanban:Kanban = new Kanban;
  
  @Output()
  personEvent = new EventEmitter();

  ngOnInit() {
    
  }

  onChangeObj(newObj) {
    console.log(newObj);
    this.seleccionado = newObj;
  }

  removeAll(){
    this.seleccionado = undefined;
  }

  save(){
    this.kanban.users.push(this.seleccionado);
    this.kanban.proyect.users.push(this.seleccionado)
    this._proyectsService.editProyect(this.kanban.proyect,this.kanban.proyect.id).subscribe(response => {
      this._kanbanService.editKanban(this.kanban,this.kanban.id).subscribe(response => {
        console.log(response);
        this.pushNotification();
      });
    });      
  }

  pushNotification(){
    let movimiento: Movement = new Movement();
    movimiento.sub = this.seleccionado.sub;
    this.removeAll();  
    movimiento.type = "Proyecto Compartido";
    movimiento.description = this._sessionService.getUser().nickname + " compartio el proyecto "+this.kanban.proyect.title+" contigo.";
    this._movementesService.addMovements(movimiento).subscribe(response => {
      this.personEvent.emit();
    });
  }

}
