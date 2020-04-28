import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcursoComponent } from './addcurso.component';

describe('AddcursoComponent', () => {
  let component: AddcursoComponent;
  let fixture: ComponentFixture<AddcursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
