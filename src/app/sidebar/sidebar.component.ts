import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: 'user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: 'table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: 'typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: 'icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: 'maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: 'proyects', title: 'Mis Proyectos',  icon:'pe-7s-box2', class: '' },
    { path: 'buys', title: 'Mis Compras',  icon:'pe-7s-credit', class: '' },
    { path: 'market', title: 'Tienda',  icon:'pe-7s-cart', class: '' },
    { path: 'help', title: 'Ayuda',  icon:'pe-7s-help1', class: '' },
    { path: 'profile', title: 'Mi Perfil',  icon:'pe-7s-user', class: '' },
    { path: 'canvas', title: 'Kanban',  icon:'pe-7s-note2', class: '' },
   // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
