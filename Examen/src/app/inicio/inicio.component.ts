import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  title:string="Bienvenido a la aplicación de cursos";
  descripcion:string="Para empezar seleccione un módulo desde el menú";

  constructor() { }

  ngOnInit() {
  }

}
