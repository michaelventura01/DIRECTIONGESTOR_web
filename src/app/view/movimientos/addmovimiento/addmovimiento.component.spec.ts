import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmovimientoComponent } from './addmovimiento.component';

describe('AddmovimientoComponent', () => {
  let component: AddmovimientoComponent;
  let fixture: ComponentFixture<AddmovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
