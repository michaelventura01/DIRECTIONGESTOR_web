import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsinscripcionestudianteComponent } from './detailsinscripcionestudiante.component';

describe('DetailsinscripcionestudianteComponent', () => {
  let component: DetailsinscripcionestudianteComponent;
  let fixture: ComponentFixture<DetailsinscripcionestudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsinscripcionestudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsinscripcionestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
