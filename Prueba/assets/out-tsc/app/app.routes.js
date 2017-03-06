import { RouterModule } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";
import { MateriaComponent } from "./materia/materia.component";
import { GrupoComponent } from "./grupo/grupo.component";
export var routes = [
    { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
    { path: 'Inicio', component: InicioComponent },
    { path: 'Materias', component: MateriaComponent },
    { path: 'Materias/:idMateria/Grupos', component: GrupoComponent }
];
export var routing = RouterModule.forRoot(routes);
//# sourceMappingURL=D:/Github/prueba-twj-aguirrestalin/Examen/src/app/app.routes.js.map