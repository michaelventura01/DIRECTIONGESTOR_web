import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsactanacimientoComponent } from './detailsactanacimiento.component';

describe('DetailsactanacimientoComponent', () => {
  let component: DetailsactanacimientoComponent;
  let fixture: ComponentFixture<DetailsactanacimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsactanacimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsactanacimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
