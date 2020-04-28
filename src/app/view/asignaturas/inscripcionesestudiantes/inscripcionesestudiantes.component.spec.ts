import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesestudiantesComponent } from './inscripcionesestudiantes.component';

describe('InscripcionesestudiantesComponent', () => {
  let component: InscripcionesestudiantesComponent;
  let fixture: ComponentFixture<InscripcionesestudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionesestudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
