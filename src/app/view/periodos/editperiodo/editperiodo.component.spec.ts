import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditperiodoComponent } from './editperiodo.component';

describe('EditperiodoComponent', () => {
  let component: EditperiodoComponent;
  let fixture: ComponentFixture<EditperiodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditperiodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditperiodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
