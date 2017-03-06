import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  private _parametros: any;
  grupo:any={};
  materia:any={};
  grupos=[];
  title:string="Administrar Grupos";
  ocultarCrearGrupo=false;
  ocultarGrupo=false;
  disabledButtons = {
    deshabilitarBotonForm: false
  };
  noHayElementos = false;
  frameError:string="";

  constructor(private _ActivatedRoute: ActivatedRoute, private _http:Http, private _masterURL:MasterURLService) { }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(parametros => {
      this._parametros = parametros;
    });
    this.leerGrupos();
  }

  leerGrupos(){
    this._http.get(this._masterURL.url+'Grupo?idMateria='+this._parametros.idMateria).subscribe(
      (res:Response)=>{
        this.grupos = res.json();
      },
      (err)=>{
        console.log(err);
      })
  }

  clicCancelarCrearGrupo(){
    this.grupo={};
    this.frameError="";
    this.ocultarCrearGrupo= !this.ocultarCrearGrupo;
  }

  crearGrupo(formulario: NgForm){
    this.disabledButtons.deshabilitarBotonForm = true;

    let nuevoGrupo = {
      nombreGrupo: formulario.value.nombreGrupo,
      numeroMaximoEstudiantes: formulario.value.numeroMaximoEstudiantes,
      idMateria: this._parametros.idMateria
    };

    this._http.post(
      this._masterURL.url + "Grupo/CrearGrupo", nuevoGrupo).subscribe(
      (res) => {
        if (!res.text().match(/Error/g)) {
          this.leerGrupos();
          this.grupo = {};
          this.disabledButtons.deshabilitarBotonForm = false;
          this.ocultarCrearGrupo=false;
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

  clicCancelarActualizarGrupo(grupo:any){
    this.frameError="";
    grupo.ocultarGrupo = !grupo.ocultarGrupo;
  }

  actualizarGrupo(grupo: any){
    this.disabledButtons.deshabilitarBotonForm = true;

    let nuevoGrupo = {
      nombreGrupo: grupo.nombreGrupo,
      numeroMaximoEstudiantes: grupo.numeroMaximoEstudiantes,
      idMateria: this._parametros.idMateria
    };
    this._http.put(this._masterURL.url + "Grupo/editarGrupo?id=" + grupo.id, nuevoGrupo)
      .subscribe(
        (res) => {
          if (!res.text().match(/Error/g)) {
            this.clicCancelarActualizarGrupo(grupo);
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

  borrarGrupo(id: number) {
    this._http.delete(this._masterURL.url + "Grupo/BorrarGrupo?id=" + id)
      .subscribe(
        (res) => {
          if (!res.text().match(/Error/g)) {
            this.grupos = this.grupos.filter((value) => value.id != id)
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
