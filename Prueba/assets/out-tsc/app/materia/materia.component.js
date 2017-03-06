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
import { MasterURLService } from "../services/master-url.service";
export var MateriaComponent = (function () {
    function MateriaComponent(_http, _masterURL) {
        this._http = _http;
        this._masterURL = _masterURL;
        this.title = "Administrar Materias";
        this.materia = {};
        this.materias = [];
        this.ocultarCrearMateria = false;
        this.ocultarMateria = false;
        this.disabledButtons = {
            deshabilitarBotonForm: false
        };
        this.noHayElementos = false;
        this.frameError = "";
    }
    MateriaComponent.prototype.ngOnInit = function () {
        this.leerMaterias();
    };
    MateriaComponent.prototype.leerMaterias = function () {
        var _this = this;
        this._http.get(this._masterURL.url + "Materia").subscribe(function (res) {
            _this.materias = res.json();
        }, function (err) {
            _this.noHayElementos = true;
        });
    };
    MateriaComponent.prototype.clicCancelarCrearMateria = function () {
        this.materia = {};
        this.frameError = "";
        this.ocultarCrearMateria = !this.ocultarCrearMateria;
    };
    MateriaComponent.prototype.crearMateria = function (formulario) {
        var _this = this;
        this.disabledButtons.deshabilitarBotonForm = true;
        var nuevaMateria = {
            nombreMateria: formulario.value.nombreMateria,
            topicoMateria: formulario.value.topicoMateria,
            fechaCreacion: new Date()
        };
        this._http.post(this._masterURL.url + "Materia/CrearMateria", nuevaMateria).subscribe(function (res) {
            if (!res.text().match(/Error/g)) {
                _this.leerMaterias();
                _this.materia = {};
                _this.disabledButtons.deshabilitarBotonForm = false;
                _this.ocultarCrearMateria = false;
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
    MateriaComponent.prototype.clicCancelarActualizarMateria = function (materia) {
        this.frameError = "";
        materia.ocultarMateria = !materia.ocultarMateria;
    };
    MateriaComponent.prototype.actualizarMateria = function (materia) {
        var _this = this;
        this.disabledButtons.deshabilitarBotonForm = true;
        var nuevaMateria = {
            nombreMateria: materia.nombreMateria,
            topicoMateria: materia.topicoMateria,
            fechaCreacion: materia.fechaCreacion
        };
        this._http.put(this._masterURL.url + "Materia/editarMateria?id=" + materia.id, nuevaMateria)
            .subscribe(function (res) {
            if (!res.text().match(/Error/g)) {
                _this.clicCancelarActualizarMateria(materia);
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
    MateriaComponent.prototype.borrarMateria = function (id) {
        var _this = this;
        this._http.delete(this._masterURL.url + "Materia/BorrarMateria?id=" + id)
            .subscribe(function (res) {
            if (!res.text().match(/Error/g)) {
                _this.materias = _this.materias.filter(function (value) { return value.id != id; });
            }
            else {
                _this.frameError = res.text();
                _this.disabledButtons.deshabilitarBotonForm = false;
            }
        }, function (err) {
            console.log(err);
        });
    };
    MateriaComponent = __decorate([
        Component({
            selector: 'app-materia',
            templateUrl: './materia.component.html',
            styleUrls: ['./materia.component.css']
        }), 
        __metadata('design:paramtypes', [Http, MasterURLService])
    ], MateriaComponent);
    return MateriaComponent;
}());
//# sourceMappingURL=D:/Github/prueba-twj-aguirrestalin/Examen/src/app/materia/materia.component.js.map