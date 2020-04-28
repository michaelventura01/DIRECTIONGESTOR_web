import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddestudiantecursoComponent } from './addestudiantecurso.component';

describe('AddestudiantecursoComponent', () => {
  let component: AddestudiantecursoComponent;
  let fixture: ComponentFixture<AddestudiantecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddestudiantecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddestudiantecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
