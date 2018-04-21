import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Profile } from '../_models/profile.model';
import { SessionService } from '../services/sessionService.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    newPath: string;
}
export const ROUTES: RouteInfo[] = [
  /*
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '', newPath:'dashboard'},
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '',newPath:'dashboard' },
    { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '',newPath:'dashboard' },
    { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '',newPath:'dashboard' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '',newPath:'dashboard' },
    { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '',newPath:'dashboard' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' ,newPath:'dashboard'},
  */
    { path: '/proyects', title: 'Mis Proyectos',  icon:'pe-7s-box2', class: '',newPath:'dashboard'},
    { path: '/proyectshares', title: 'Proyectos Compartidos',  icon:'pe-7s-share', class: '',newPath:'dashboard'},
    { path: '/buys', title: 'Mis Compras',  icon:'pe-7s-credit', class: '',newPath:'dashboard' },
    { path: '/movements', title: 'Movimientos',  icon:'pe-7s-calculator', class: '',newPath:'dashboard' },
    { path: '/market', title: 'Tienda',  icon:'pe-7s-cart', class: '',newPath:'dashboard' },
    { path: '/help', title: 'Ayuda',  icon:'pe-7s-help1', class: '',newPath:'dashboard' },
    { path: '/profile', title: 'Mi Perfil',  icon:'pe-7s-user', class: '',newPath:'dashboard' },
    { path: '/profile', title: 'Salir',  icon:'pe-7s-back-2', class: '',newPath:'dashboard' },

    // { path: '/canvas', title: 'Kanban',  icon:'pe-7s-note2', class: '',newPath:'dashboard' },
   // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  profile:Profile = new Profile;
  constructor(private auth:AuthService,private router: Router, private _sessionService: SessionService) { }

  ngOnInit() {
    this.profile = this._sessionService.getUser();
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  salir(){
    this._sessionService.clearUser();
    this.auth.logout();
    this.auth.login();
  }
}
