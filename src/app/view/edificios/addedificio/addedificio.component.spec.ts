import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedificioComponent } from './addedificio.component';

describe('AddedificioComponent', () => {
  let component: AddedificioComponent;
  let fixture: ComponentFixture<AddedificioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedificioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
