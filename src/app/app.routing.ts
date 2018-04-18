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
import { ChartsComponent } from './charts/charts.component';
import { InfoChartsComponent } from './charts/infoCharts.component';
import { ValidandoComponent } from './validando/validando.component';
import { IssuesComponent } from './issues/issues.component';
import { InicioComponent } from './inicio/inicio.component';
import { FinComponent } from './fin/fin.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { MovementsComponent } from './movements/movements.component';

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
    { path: 'inicio',               component: InicioComponent },
    { path: 'fin',                  component: FinComponent },
    { path: 'index',                component: IndexComponent },
    { path: 'canvas/:id',           component: CanvasComponent       /* canActivate:[AuthGuardService]*/},
    { path: 'issues/:id',           component: IssuesComponent       /* canActivate:[AuthGuardService]*/},
    { path: 'proyectDetails/:id',   component: ProyectdetailsComponent },
    { path: 'charts',               component: ChartsComponent },
    { path: 'infoCharts/:id',       component: InfoChartsComponent },
    { path: 'assessment/:id',       component: AssessmentComponent },
    { path: 'validando/:id',        component: ValidandoComponent },
    { path: 'movements',            component: MovementsComponent },
    { path: '**', redirectTo: 'index', pathMatch: 'full'},
    { path: '',   redirectTo: 'index', pathMatch: 'full' }
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
