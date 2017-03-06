import { async, TestBed } from '@angular/core/testing';
import { InicioComponent } from './inicio.component';
describe('InicioComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [InicioComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(InicioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=D:/Github/prueba-twj-aguirrestalin/Examen/src/app/inicio/inicio.component.spec.js.map