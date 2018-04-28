import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';

// MultiSelected
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';


import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { BuysComponent } from './buys/buys.component';
import { MarketComponent } from './market/market.component';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ProyectdetailsComponent } from './proyectdetails/proyectdetails.component';
// Componentes Modal
import { UpFileComponent } from './_modals/files/up-file/up-file.component';
import { ProyectComponent } from './_modals/proyects/proyect/proyect.component';
import { DeleteProyectComponent } from './_modals/proyects/delete-proyect/delete-proyect.component';
import { DownloadFilesComponent } from './_modals/files/download-files/download-files.component';
import { ProyectsService } from './proyects/proyects.service';
import { KanbanService } from './canvas/canvas.service';
import { HomeworkComponent } from './_modals/homeworks/homework/homework.component';
import { UserService } from './user/user.service';
import { MaincontainerComponent } from './maincontainer/maincontainer.component';
import { IndexComponent } from './index/index.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ProyectDetailsService } from './proyectdetails/proyectdetails.service';
import { FolderComponent } from './_modals/folders/folder/folder.component';
import { ChartsComponent } from './charts/charts.component';
import { InfoChartsComponent } from './charts/infoCharts.component';
import { ChartsService } from './charts/charts.service';
import { ValidandoComponent } from './validando/validando.component';
import { ValidandoService } from './validando/validando.service';
import { IssuesComponent } from './issues/issues.component';
import { IssuesService } from './issues/issues.service';
import { InicioComponent } from './inicio/inicio.component';
import { FinComponent } from './fin/fin.component';
import { InicioService } from './inicio/inicio.service';
import { PersonComponent } from './_modals/person/person.component';
import { ProfileService } from './profile/profile.service';
import { AssignedComponent } from './_modals/homeworks/assigned/assigned.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { MovementsComponent } from './movements/movements.component';
import { BuysService } from './buys/buys.service';
import { MovementsService } from './movements/movements.service';
import { ProyectsharesComponent } from './proyectshares/proyectshares.component';
import { ProyectsharesService } from './proyectshares/proyectshares.service';
import { SessionService } from './services/sessionService.service';
import { CookieService } from 'angular2-cookie/services';
import { MarketDetailComponent } from 'app/marketdetail/marketdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ProyectsComponent,
    BuysComponent,
    MarketComponent,
    HelpComponent,
    ProfileComponent,
    CanvasComponent,
    ProyectdetailsComponent,
    UpFileComponent,
    ProyectComponent,
    DeleteProyectComponent,
    DownloadFilesComponent,
    HomeworkComponent,
    MaincontainerComponent,
    IndexComponent,
    FolderComponent,
    ChartsComponent,
    InfoChartsComponent,
    ValidandoComponent,
    IssuesComponent,
    InicioComponent,
    FinComponent,
    PersonComponent,
    AssignedComponent,
    AssessmentComponent,
    MovementsComponent,
    ProyectsharesComponent,
    MarketDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    LbdModule,
    AngularMultiSelectModule,
    ChartsModule
  ],
  providers: [
    ProyectsService,
    KanbanService,
    UserService,
    AuthService,
    AuthGuardService,
    ProyectDetailsService,
    ChartsService,
    ValidandoService,
    IssuesService,
    InicioService,
    ProfileService,
    BuysService,
    MovementsService,
    ProyectsharesService,
    SessionService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }