import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearmensajeComponent } from './crearmensaje.component';

describe('CrearmensajeComponent', () => {
  let component: CrearmensajeComponent;
  let fixture: ComponentFixture<CrearmensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearmensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearmensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
