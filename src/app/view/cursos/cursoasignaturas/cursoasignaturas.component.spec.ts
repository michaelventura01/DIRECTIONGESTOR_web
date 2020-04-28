import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoasignaturasComponent } from './cursoasignaturas.component';

describe('CursoasignaturasComponent', () => {
  let component: CursoasignaturasComponent;
  let fixture: ComponentFixture<CursoasignaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoasignaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoasignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
