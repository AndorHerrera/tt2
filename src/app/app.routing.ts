import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ProyectsComponent } from 'app/proyects/proyects.component';
import { BuysComponent } from 'app/buys/buys.component';
import { MarketComponent } from 'app/market/market.component';
import { HelpComponent } from 'app/help/help.component';
import { Profile } from 'selenium-webdriver/firefox';
import { CanvasComponent } from 'app/canvas/canvas.component';
import { ProfileComponent } from 'app/profile/profile.component';
import { ProyectdetailsComponent } from './proyectdetails/proyectdetails.component';
import { IndexComponent } from './index/index.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes =[
    { path: 'dashboard',            component: HomeComponent },
    { path: 'user',                 component: UserComponent },
    { path: 'table',                component: TablesComponent },
    { path: 'typography',           component: TypographyComponent },
    { path: 'icons',                component: IconsComponent },
    { path: 'maps',                 component: MapsComponent },
    { path: 'notifications',        component: NotificationsComponent },
    { path: 'upgrade',              component: UpgradeComponent },
    { path: 'proyects',             component: ProyectsComponent,       },
    { path: 'buys',                 component: BuysComponent },
    { path: 'market',               component: MarketComponent },
    { path: 'help',                 component: HelpComponent },
    { path: 'profile',              component: ProfileComponent },
    { path: 'index',                component: IndexComponent },
    { path: 'canvas/:id',           component: CanvasComponent       /* canActivate:[AuthGuardService]*/},
    { path: 'proyectDetails/:id',   component: ProyectdetailsComponent },
    { path: '**', redirectTo: 'proyects', pathMatch: 'full'},

    { path: '',          redirectTo: 'dashboard', pathMatch: 'full' }
];



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
