import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscursoasignaturaComponent } from './detailscursoasignatura.component';

describe('DetailscursoasignaturaComponent', () => {
  let component: DetailscursoasignaturaComponent;
  let fixture: ComponentFixture<DetailscursoasignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscursoasignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailscursoasignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
