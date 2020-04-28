import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmovimientoComponent } from './detailsmovimiento.component';

describe('DetailsmovimientoComponent', () => {
  let component: DetailsmovimientoComponent;
  let fixture: ComponentFixture<DetailsmovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsmovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsmovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
