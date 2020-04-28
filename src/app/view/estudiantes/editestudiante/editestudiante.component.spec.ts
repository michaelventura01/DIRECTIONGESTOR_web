import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditestudianteComponent } from './editestudiante.component';

describe('EditestudianteComponent', () => {
  let component: EditestudianteComponent;
  let fixture: ComponentFixture<EditestudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditestudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
