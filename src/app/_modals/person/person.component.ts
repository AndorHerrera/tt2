import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../_models/user.model';
import { KanbanService } from '../../canvas/canvas.service';
import { Kanban } from '../../_models/kanban.model';
import { ProyectsService } from '../../proyects/proyects.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(private _userService:UserService, private _kanbanService:KanbanService, private _proyectsService: ProyectsService) { }

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
        this.removeAll();     
        this.personEvent.emit();
      });
    });      
  }

}
