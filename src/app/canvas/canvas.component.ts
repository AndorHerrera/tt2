import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { ActivatedRoute } from '@angular/router';
import { KanbanService } from './canvas.service';
import { Kanban } from '../_models/kanban.model';
import { HomeworkMin } from '../_models/homework.min.model';
import { HomeworkComponent } from '../_modals/homeworks/homework/homework.component';
import { Homework } from '../_models/homework.model';
import { UserService } from 'app/user/user.service';
declare var $:any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  tarea: Homework;
  idProyecto:string="";
  idKanban:string="";
  kanban:Kanban = new Kanban;
  tareas:HomeworkMin[] = [];
  tareasPorHacer:HomeworkMin[] = [];
  tareasRealizadas:HomeworkMin[] = [];
  tareasEnProceso:HomeworkMin[] = [];
  dragIn:boolean=false;
  idTareaSeleccionada:string;

  @ViewChild(HomeworkComponent)
  modalHomeworks: HomeworkComponent;

  constructor(private _activaRoute: ActivatedRoute,private _kanbanService: KanbanService,private _userService: UserService) {

   }

   
   

  ngOnInit() {
    this._activaRoute.params.subscribe( params => {
      this.idProyecto = params['id'];
      console.log("id",this.idProyecto);
      this.getKanban();
    });
  }

  getKanban(){ // Obtiene los items de la tabla
    this._kanbanService.getKanban(this.idProyecto).subscribe(response => {
        this.kanban = response[0];
        this.idKanban = this.kanban.id;
        this.getTareas();
    });
  }

  getTareas(){ // Obtiene las tareas dado un idKanban
    this._kanbanService.getHomeworks(this.idKanban).subscribe(response => {
      this.tareas = response;
      this.llenaColumnas();      
    });
  }

  inicializaTereas(){
    this.tareasEnProceso=[];
    this.tareasPorHacer=[];
    this.tareasRealizadas=[];
  }

  llenaColumnas(){
    $(".tarea").remove();
    this.inicializaTereas();
    if(this.tareas!=undefined){
      for(let x=0; x <this.tareas.length; x++){
        if(this.tareas[x].status=="Por Hacer"){
          this.tareasPorHacer.push(this.tareas[x]);
        } else if (this.tareas[x].status=="En Proceso"){
          this.tareasEnProceso.push(this.tareas[x]);
        } else if (this.tareas[x].status=="Realizadas"){
          this.tareasRealizadas.push(this.tareas[x])
        }
      }
    }
  }

  elementoGuardado(){
    $.notify({
        icon: "pe-7s-diskette",
        message: "<b>TAREA GUARDADA DE FORMA EXITOSA!!.</b>"
    },{
        type:'success',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
    this.getTareas();
  }

  arrastrar(tarea:Homework){
    this._kanbanService.getHomework(tarea.id).subscribe(response => {
      this.tarea = response;
    });
    this.dragIn = true;
    this.idTareaSeleccionada = tarea.id;
    let x = $("#"+this.idTareaSeleccionada).parents().attr("id");
    let xx = $("#"+this.idTareaSeleccionada).parents().parents().attr("id");
    if(x=="porHacer" || xx=="porHacer"){
      $('.enProceso').hide();
      $('.Realizadas').hide();
    } else if (x=="enProce" || xx=="enProce"){
      $('.porHacer').hide();
      $('.Realizadas').hide();
    } else if (x=="realiza" || xx=="realiza"){
      $('.enProceso').hide();
      $('.porHacer').hide();
    }
  //  this.idTareaSeleccionada = id;
  //  $('.tareas.').not("#"+id).hide();
  }

  soltar(){
    $(".tareas").show();
    let x; 
    x = $("#"+this.idTareaSeleccionada).parents().attr("id");
    if(x=="porHacer"){
      this.tarea.status = "Por Hacer";
    } else if (x=="enProce"){
      this.tarea.status = "En Proceso";
    } else if (x=="realiza"){
      this.tarea.status = "Realizadas";
    }
    this.dragIn = false;
    this._kanbanService.editHomework(this.tarea,this.tarea.id).subscribe(response => {
      if(this.tarea.status == "Por Hacer"){
        $("#"+this.tarea.id).removeClass('enProceso');
        $("#"+this.tarea.id).removeClass('Realizadas');
        $("#"+this.tarea.id).addClass('porHacer');
      } else if (this.tarea.status == "En Proceso"){
        $("#"+this.tarea.id).removeClass('porHacer');
        $("#"+this.tarea.id).removeClass('Realizadas');
        $("#"+this.tarea.id).addClass('enProceso');
      } else if (this.tarea.status == "Realizadas"){
        $("#"+this.tarea.id).removeClass('porHacer');
        $("#"+this.tarea.id).removeClass('enProceso');
        $("#"+this.tarea.id).addClass('Realizadas');
      }
      $.notify({
        icon: "pe-7s-diskette",
        message: "<b>ESTADO CAMBIADO DE FORMA EXITOSA!!.</b>"
      },{
          type:'success',
          timer: 1000,
          placement: {
              from: 'top',
              align: 'right'
          }
      });
    });

    
  }


  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  editar(id:string){ // Obtiene los items de la tabla
    this._kanbanService.getHomework(id).subscribe(response => {
        this.tarea = response;
        this.sendModalHomeworks();
    });
  }

  sendModalHomeworks(){ // Manda Datos a modal Proyects
    this.modalHomeworks.id = this.tarea.id;
    this.modalHomeworks.titulo = this.tarea.title;
    this.modalHomeworks.prioridad = this.tarea.priority;
    this.modalHomeworks.fechaEntrega = this.tarea.deliveryDate;
    this.modalHomeworks.descripcion = this.tarea.description;
    this.modalHomeworks.kanban = this.kanban;
    this.modalHomeworks.status = this.tarea.status;
    this.modalHomeworks.asignados = this.kanban.users;
    this.modalHomeworks.asignado = this.tarea.assigned;
    this.modalHomeworks.autor = this.tarea.author;
    this.modalHomeworks.accion = true;
  }

  newHomework(){
    this.modalHomeworks.asignados = this.kanban.users;
    this.modalHomeworks.kanban = this.kanban;
    this.modalHomeworks.accion = false;
    // Vaciar resto de parametros
    this.modalHomeworks.id = "";
    this.modalHomeworks.titulo = "";
    this.modalHomeworks.prioridad = "";
    this.modalHomeworks.fechaEntrega = null;
    this.modalHomeworks.descripcion = "";
    this.modalHomeworks.asignado = null;
    this.modalHomeworks.autor = null;
  }

}