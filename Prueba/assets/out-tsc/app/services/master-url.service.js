var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
export var MasterURLService = (function () {
    function MasterURLService() {
        //this._url="http://localhost:1337/";
        this._url = "https://examen-twj-aguirrestalin-nekopq.c9users.io:1337/";
    }
    Object.defineProperty(MasterURLService.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (nuevoUrl) {
            this._url = nuevoUrl;
        },
        enumerable: true,
        configurable: true
    });
    MasterURLService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], MasterURLService);
    return MasterURLService;
}());
//# sourceMappingURL=D:/Github/prueba-twj-aguirrestalin/Examen/src/app/services/master-url.service.js.map