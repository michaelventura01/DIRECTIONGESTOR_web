import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsestudiantecursoComponent } from './detailsestudiantecurso.component';

describe('DetailsestudiantecursoComponent', () => {
  let component: DetailsestudiantecursoComponent;
  let fixture: ComponentFixture<DetailsestudiantecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsestudiantecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsestudiantecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
