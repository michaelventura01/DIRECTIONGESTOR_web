import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcalificacionComponent } from './addcalificacion.component';

describe('AddcalificacionComponent', () => {
  let component: AddcalificacionComponent;
  let fixture: ComponentFixture<AddcalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
