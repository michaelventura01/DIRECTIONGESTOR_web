import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarinscripcionestudianteComponent } from './editarinscripcionestudiante.component';

describe('EditarinscripcionestudianteComponent', () => {
  let component: EditarinscripcionestudianteComponent;
  let fixture: ComponentFixture<EditarinscripcionestudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarinscripcionestudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarinscripcionestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
