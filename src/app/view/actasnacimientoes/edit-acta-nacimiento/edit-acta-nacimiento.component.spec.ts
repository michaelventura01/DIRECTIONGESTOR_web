import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActaNacimientoComponent } from './edit-acta-nacimiento.component';

describe('EditActaNacimientoComponent', () => {
  let component: EditActaNacimientoComponent;
  let fixture: ComponentFixture<EditActaNacimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActaNacimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActaNacimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
