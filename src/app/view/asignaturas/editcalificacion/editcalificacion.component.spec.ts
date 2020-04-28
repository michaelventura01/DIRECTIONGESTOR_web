import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcalificacionComponent } from './editcalificacion.component';

describe('EditcalificacionComponent', () => {
  let component: EditcalificacionComponent;
  let fixture: ComponentFixture<EditcalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
