import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditestudiantecursoComponent } from './editestudiantecurso.component';

describe('EditestudiantecursoComponent', () => {
  let component: EditestudiantecursoComponent;
  let fixture: ComponentFixture<EditestudiantecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditestudiantecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditestudiantecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
