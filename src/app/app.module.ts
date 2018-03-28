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
    HomeworkComponent

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
  ],
  providers: [
    ProyectsService,
    KanbanService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
