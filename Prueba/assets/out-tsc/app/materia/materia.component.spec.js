import { async, TestBed } from '@angular/core/testing';
import { MateriaComponent } from './materia.component';
describe('MateriaComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MateriaComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MateriaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=D:/Github/prueba-twj-aguirrestalin/Examen/src/app/materia/materia.component.spec.js.map