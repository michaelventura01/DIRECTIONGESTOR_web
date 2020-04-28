import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActaNacimientoComponent } from './add-acta-nacimiento.component';

describe('AddActaNacimientoComponent', () => {
  let component: AddActaNacimientoComponent;
  let fixture: ComponentFixture<AddActaNacimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActaNacimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActaNacimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
