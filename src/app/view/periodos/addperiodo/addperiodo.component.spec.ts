import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddperiodoComponent } from './addperiodo.component';

describe('AddperiodoComponent', () => {
  let component: AddperiodoComponent;
  let fixture: ComponentFixture<AddperiodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddperiodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddperiodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
