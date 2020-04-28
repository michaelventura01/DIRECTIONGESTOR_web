import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirestudianteComponent } from './inscribirestudiante.component';

describe('InscribirestudianteComponent', () => {
  let component: InscribirestudianteComponent;
  let fixture: ComponentFixture<InscribirestudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscribirestudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscribirestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
