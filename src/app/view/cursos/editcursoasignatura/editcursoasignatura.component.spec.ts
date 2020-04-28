import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcursoasignaturaComponent } from './editcursoasignatura.component';

describe('EditcursoasignaturaComponent', () => {
  let component: EditcursoasignaturaComponent;
  let fixture: ComponentFixture<EditcursoasignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcursoasignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcursoasignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
