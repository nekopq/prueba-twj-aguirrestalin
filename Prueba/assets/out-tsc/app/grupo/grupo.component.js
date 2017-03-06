var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { MasterURLService } from "../services/master-url.service";
export var GrupoComponent = (function () {
    function GrupoComponent(_ActivatedRoute, _http, _masterURL) {
        this._ActivatedRoute = _ActivatedRoute;
        this._http = _http;
        this._masterURL = _masterURL;
        this.grupo = {};
        this.materia = {};
        this.grupos = [];
        this.title = "Administrar Grupos";
        this.ocultarCrearGrupo = false;
        this.ocultarGrupo = false;
        this.disabledButtons = {
            deshabilitarBotonForm: false
        };
        this.noHayElementos = false;
        this.frameError = "";
    }
    GrupoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._ActivatedRoute.params.subscribe(function (parametros) {
            _this._parametros = parametros;
        });
        this.leerGrupos();
    };
    GrupoComponent.prototype.leerGrupos = function () {
        var _this = this;
        this._http.get(this._masterURL.url + 'Grupo?idMateria=' + this._parametros.idMateria).subscribe(function (res) {
            _this.grupos = res.json();
        }, function (err) {
            console.log(err);
        });
    };
    GrupoComponent.prototype.clicCancelarCrearGrupo = function () {
        this.grupo = {};
        this.frameError = "";
        this.ocultarCrearGrupo = !this.ocultarCrearGrupo;
    };
    GrupoComponent.prototype.crearGrupo = function (formulario) {
        var _this = this;
        this.disabledButtons.deshabilitarBotonForm = true;
        var nuevoGrupo = {
            nombreGrupo: formulario.value.nombreGrupo,
            numeroMaximoEstudiantes: formulario.value.numeroMaximoEstudiantes,
            idMateria: this._parametros.idMateria
        };
        this._http.post(this._masterURL.url + "Grupo/CrearGrupo", nuevoGrupo).subscribe(function (res) {
            if (!res.text().match(/Error/g)) {
                _this.leerGrupos();
                _this.grupo = {};
                _this.disabledButtons.deshabilitarBotonForm = false;
                _this.ocultarCrearGrupo = false;
                _this.frameError = "";
            }
            else {
                _this.frameError = res.text();
                _this.disabledButtons.deshabilitarBotonForm = false;
            }
        }, function (err) {
            _this.disabledButtons.deshabilitarBotonForm = false;
            console.log("Ocurrio un error", err);
        });
    };
    GrupoComponent.prototype.clicCancelarActualizarGrupo = function (grupo) {
        this.frameError = "";
        grupo.ocultarGrupo = !grupo.ocultarGrupo;
    };
    GrupoComponent.prototype.actualizarGrupo = function (grupo) {
        var _this = this;
        this.disabledButtons.deshabilitarBotonForm = true;
        var nuevoGrupo = {
            nombreGrupo: grupo.nombreGrupo,
            numeroMaximoEstudiantes: grupo.numeroMaximoEstudiantes,
            idMateria: this._parametros.idMateria
        };
        this._http.put(this._masterURL.url + "Grupo/editarGrupo?id=" + grupo.id, nuevoGrupo)
            .subscribe(function (res) {
            if (!res.text().match(/Error/g)) {
                _this.clicCancelarActualizarGrupo(grupo);
                _this.disabledButtons.deshabilitarBotonForm = false;
            }
            else {
                _this.frameError = res.text();
                _this.disabledButtons.deshabilitarBotonForm = false;
            }
        }, function (err) {
            console.log("Error:", err);
            _this.frameError = err.text();
            _this.disabledButtons.deshabilitarBotonForm = false;
        });
    };
    GrupoComponent.prototype.borrarGrupo = function (id) {
        var _this = this;
        this._http.delete(this._masterURL.url + "Grupo/BorrarGrupo?id=" + id)
            .subscribe(function (res) {
            if (!res.text().match(/Error/g)) {
                _this.grupos = _this.grupos.filter(function (value) { return value.id != id; });
            }
            else {
                _this.frameError = res.text();
                _this.disabledButtons.deshabilitarBotonForm = false;
            }
        }, function (err) {
            console.log(err);
        });
    };
    GrupoComponent = __decorate([
        Component({
            selector: 'app-grupo',
            templateUrl: './grupo.component.html',
            styleUrls: ['./grupo.component.css']
        }), 
        __metadata('design:paramtypes', [ActivatedRoute, Http, MasterURLService])
    ], GrupoComponent);
    return GrupoComponent;
}());
//# sourceMappingURL=D:/Github/prueba-twj-aguirrestalin/Examen/src/app/grupo/grupo.component.js.map