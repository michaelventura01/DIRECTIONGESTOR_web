import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEmpleadoComponent } from './asignar-empleado.component';

describe('AsignarEmpleadoComponent', () => {
  let component: AsignarEmpleadoComponent;
  let fixture: ComponentFixture<AsignarEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
