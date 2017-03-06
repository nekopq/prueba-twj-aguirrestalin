import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  title:string="Administrar Materias";
  materia:any={};
  materias=[];
  ocultarCrearMateria=false;
  ocultarMateria=false;
  disabledButtons = {
    deshabilitarBotonForm: false
  };
  noHayElementos = false;
  frameError:string="";

  constructor(private _http: Http, private _masterURL: MasterURLService) {}

  ngOnInit() {
    this.leerMaterias();
  }

  leerMaterias(){
    this._http.get(this._masterURL.url + "Materia").subscribe(
      (res: Response) => {
        this.materias = res.json();
      },
      (err) => {
        this.noHayElementos = true;
      }
    )
  }

  clicCancelarCrearMateria(){
    this.materia={};
    this.frameError="";
    this.ocultarCrearMateria= !this.ocultarCrearMateria;
  }

  crearMateria(formulario: NgForm){
    this.disabledButtons.deshabilitarBotonForm = true;

    let nuevaMateria = {
      nombreMateria: formulario.value.nombreMateria,
      topicoMateria: formulario.value.topicoMateria,
      fechaCreacion: new Date()
    };

    this._http.post(
      this._masterURL.url + "Materia/CrearMateria", nuevaMateria).subscribe(
      (res) => {
        if (!res.text().match(/Error/g)) {
          this.leerMaterias();
          this.materia = {};
          this.disabledButtons.deshabilitarBotonForm = false;
          this.ocultarCrearMateria=false;
          this.frameError="";
        }
        else {
          this.frameError = res.text();
          this.disabledButtons.deshabilitarBotonForm = false;
        }
      },
      (err) => {
        this.disabledButtons.deshabilitarBotonForm= false;
        console.log("Ocurrio un error", err);
      },
    );
  }

  clicCancelarActualizarMateria(materia:any){
    this.frameError="";
    materia.ocultarMateria = !materia.ocultarMateria;
  }

  actualizarMateria(materia: any){
    this.disabledButtons.deshabilitarBotonForm = true;

    let nuevaMateria = {
      nombreMateria: materia.nombreMateria,
      topicoMateria: materia.topicoMateria,
      fechaCreacion: materia.fechaCreacion
    };
    this._http.put(this._masterURL.url + "Materia/editarMateria?id=" + materia.id, nuevaMateria)
      .subscribe(
        (res) => {
          if (!res.text().match(/Error/g)) {
            this.clicCancelarActualizarMateria(materia);
            this.disabledButtons.deshabilitarBotonForm = false;
          }
          else {
            this.frameError = res.text();
            this.disabledButtons.deshabilitarBotonForm = false;
          }
        },
        (err) => {
          console.log("Error:", err);
          this.frameError = err.text();
          this.disabledButtons.deshabilitarBotonForm = false;
        }
      )
  }

  borrarMateria(id: number) {
    this._http.delete(this._masterURL.url + "Materia/BorrarMateria?id=" + id)
      .subscribe(
        (res) => {
          if (!res.text().match(/Error/g)) {
            this.materias = this.materias.filter((value) => value.id != id)
          }
          else {
            this.frameError = res.text();
            this.disabledButtons.deshabilitarBotonForm = false;
          }
        },
        (err) => {
          console.log(err);
        }
      )
  }
}
