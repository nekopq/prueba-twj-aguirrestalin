import { async, TestBed } from '@angular/core/testing';
import { GrupoComponent } from './grupo.component';
describe('GrupoComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [GrupoComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GrupoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=D:/Github/prueba-twj-aguirrestalin/Examen/src/app/grupo/grupo.component.spec.js.map