import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuesService } from './issues.service';
import { BodyIssues } from '../_models/bodyIssues.model';
import { Issues } from '../_models/Issues.model';
import { HomeworkComponent } from '../_modals/homeworks/homework/homework.component';
import { ProyectDetailsService } from '../proyectdetails/proyectdetails.service';
import { Folder } from '../_models/folder.model';
import { KanbanService } from '../canvas/canvas.service';
import { Kanban } from '../_models/kanban.model';
declare var $:any;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  constructor(private _activaRoute: ActivatedRoute, private _issuesService:IssuesService, 
    private router:Router,private _proyectDetailsService: ProyectDetailsService, private _kanbanService: KanbanService) { 
    this.blockLoader = true;
  }
  
  idProyect:string;
  idFolder:string;
  kanban:Kanban = new Kanban;
  bodyIssues:BodyIssues;
  blockLoader:boolean=true;

  @ViewChild(HomeworkComponent)
  modalHomeworks: HomeworkComponent;

  ngOnInit() {
    this.blockLoader=true;
    this._activaRoute.params.subscribe( params => {
      this.idProyect = params['id'];
      this.getFolder();
    });
  }

  getFolder(){
    this._proyectDetailsService.getFolder(this.idProyect).subscribe(response => {
      let folder:Folder = response[0];
      this.idFolder = folder.id;
      this.getKanban();
    });
  }

  getKanban(){ // Obtiene los items de la tabla
    this._kanbanService.getKanban(this.idProyect).subscribe(response => {
        this.kanban = response[0];
        console.log("Este es el kanban"+this.kanban.proyect.id);
        this.getIssues();
    });
  } 

  getIssues(){
    this._issuesService.getIssues(this.idFolder).subscribe(response => {
      this.bodyIssues = response;
      for(let x=0; x < this.bodyIssues.issues.length; x++){
        // Modifica Nombre de archivo
        let z = this.bodyIssues.issues[x].component.split("files/");
        this.bodyIssues.issues[x].component = z[1];
        let r = this.bodyIssues.issues[x].component.split("/");
        this.bodyIssues.issues[x].component = this.bodyIssues.issues[x].component.replace(r[0],"Home");
        // Modifica Severidad 
        if(this.bodyIssues.issues[x].severity=="MINOR"){
          this.bodyIssues.issues[x].severity = "Menor"
        } else if(this.bodyIssues.issues[x].severity=="MAJOR"){
          this.bodyIssues.issues[x].severity = "Mayor"
        } else if (this.bodyIssues.issues[x].severity=="CRITICAL"){
          this.bodyIssues.issues[x].severity = "Critica"
        } else if (this.bodyIssues.issues[x].severity=="BLOCKER"){
          this.bodyIssues.issues[x].severity = "Bloqueante"
        } 
        // Modifica Tipo 
        if(this.bodyIssues.issues[x].type=="VULNERABILITY"){
          this.bodyIssues.issues[x].type = "Vulnerabilidad"
        } else if(this.bodyIssues.issues[x].type=="BUG"){
          this.bodyIssues.issues[x].type = "Bug"
        } else if (this.bodyIssues.issues[x].type=="CODE_SMELL"){
          this.bodyIssues.issues[x].type = "Lineas Apestosas"
        } 
      }
      $('#myTable').DataTable().destroy();
      this.cargaTabla();
  });
  }

  asignarIssue(issue:Issues){
    this.modalHomeworks.asignados = this.kanban.users;
    this.modalHomeworks.kanban = this.kanban;
    this.modalHomeworks.titulo = "Resolver Incidencia:" + issue.message;
    this.modalHomeworks.descripcion = "Incidencia de tipo " + issue.type + " con severidad " + issue.severity + 
    " en el archivo: " + issue.component + " linea " + issue.line + ". Descripcion: " + issue.message;
    this.modalHomeworks.accion = false;
    console.log(issue);
  }

  elementoGuardado(){ // redirigir a kanban
    $.notify({
      icon: "pe-7s-diskette",
      message: "<b>INCIDENCIA ASIGNADA DE FORMA EXITOSA!!.</b>"
    },{
        type:'success',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
  }

  cargaTabla(){
    this.blockLoader = false;
    setTimeout(function () {
      var table = $('#myTable').DataTable({
        "aLengthMenu": [[10, 25, 100, -1], [10, 25, 100, "Todos"]],
        "iDisplayLength": 10,
        "aoColumns": [{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": true },{ "bSortable": false }],
          "oLanguage": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ ",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
             "sPrevious": "Anterior",
             "sNext": "Siguiente"
            },
         },
         initComplete: function() {
          var api = this.api();
          $('#myTable thead tr#forFilters th').each(function(i) {
              if (i == 0 || i == 2 || i == 3) {
                  var column = api.column(i);
                  var select = $('<select><option value=""></option></select>').appendTo($(this)).on('change', function() {
                      var val = $.fn.dataTable.util.escapeRegex(
                      $(this).val());
                      column.search(val ? '^' + val + '$' : '', true, false).draw();
                  });
                  column.data().unique().sort().each(function(d, j) {
                      select.append('<option value="' + d + '">' + d + '</option>')
                  });
              }
          });
      }});
    },1);
  }



}