import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import {InicioComponent} from "./inicio/inicio.component";
import {MateriaComponent} from "./materia/materia.component";
import {GrupoComponent} from "./grupo/grupo.component";

export const routes: Routes = [
  {path: '', redirectTo: 'Inicio', pathMatch: 'full'},
  {path: 'Inicio', component: InicioComponent},
  {path: 'Materia', component: MateriaComponent},
  {path: 'Materia/:idMateria/grupo', component: GrupoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
