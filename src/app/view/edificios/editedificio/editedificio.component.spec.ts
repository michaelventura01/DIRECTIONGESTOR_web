import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditedificioComponent } from './editedificio.component';

describe('EditedificioComponent', () => {
  let component: EditedificioComponent;
  let fixture: ComponentFixture<EditedificioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditedificioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditedificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
