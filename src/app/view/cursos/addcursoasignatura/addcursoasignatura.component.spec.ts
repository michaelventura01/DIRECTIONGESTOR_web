import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcursoasignaturaComponent } from './addcursoasignatura.component';

describe('AddcursoasignaturaComponent', () => {
  let component: AddcursoasignaturaComponent;
  let fixture: ComponentFixture<AddcursoasignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcursoasignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcursoasignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
