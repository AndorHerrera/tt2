import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService.service';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef, private auth:AuthService,	
              private router: Router, private _sessionService: SessionService
    ) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    salir(){
        this._sessionService.clearUser();
        this.auth.logout();
        this.auth.login();
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());


      if(titlee.indexOf("/proyectshares")!=-1)
        return "Proyectos Compartidos Conmigo";
      if(titlee.indexOf("/movements")!=-1)
        return "Movimientos";
      if(titlee.indexOf("/canvas/")!=-1)
        return "Tablero Kanban";
      if(titlee.indexOf("/assessment/")!=-1)
        return "Valoración de Proyecto";
      if(titlee.indexOf("/validando/")!=-1)
        return "Análisis en Proceso";
      if(titlee.indexOf("/proyectDetails/")!=-1)
        return "Detalle de Proyecto";
      if(titlee.indexOf("/proyects")!=-1)
        return "Mis Proyectos";
      if(titlee.indexOf("/issues")!=-1)
        return "Incidencias";
      if(titlee.indexOf("/charts")!=-1)
        return "Análisis Sonar";
      if(titlee.indexOf("/profile")!=-1)
        return "Mi Perfil";
      if(titlee.indexOf("/buys")!=-1)
        return "Mis Compras";
      if(titlee.indexOf("/market")!=-1)
        return "Tienda de Proyectos";
      if(titlee.indexOf("/help")!=-1)
        return "Ayuda";

      titlee = titlee.split('/').pop();
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return '';
    }
}
