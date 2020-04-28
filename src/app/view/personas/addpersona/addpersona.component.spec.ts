import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpersonaComponent } from './addpersona.component';

describe('AddpersonaComponent', () => {
  let component: AddpersonaComponent;
  let fixture: ComponentFixture<AddpersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
