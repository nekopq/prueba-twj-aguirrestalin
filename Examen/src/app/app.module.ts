import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MateriaComponent } from './materia/materia.component';
import { GrupoComponent } from './grupo/grupo.component';
import { InicioComponent } from './inicio/inicio.component';
import {routing} from "./app.routes";
import {MasterURLService} from "./services/master-url.service";

@NgModule({
  declarations: [AppComponent, MateriaComponent, GrupoComponent, InicioComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MasterURLService,
    MateriaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
