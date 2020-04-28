import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantecursosComponent } from './estudiantecursos.component';

describe('EstudiantecursosComponent', () => {
  let component: EstudiantecursosComponent;
  let fixture: ComponentFixture<EstudiantecursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantecursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
