import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmensajeComponent } from './detailsmensaje.component';

describe('DetailsmensajeComponent', () => {
  let component: DetailsmensajeComponent;
  let fixture: ComponentFixture<DetailsmensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsmensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsmensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
