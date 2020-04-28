import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsempleadoComponent } from './detailsempleado.component';

describe('DetailsempleadoComponent', () => {
  let component: DetailsempleadoComponent;
  let fixture: ComponentFixture<DetailsempleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsempleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
