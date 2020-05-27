import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreacionComponent } from './editreacion.component';

describe('EditreacionComponent', () => {
  let component: EditreacionComponent;
  let fixture: ComponentFixture<EditreacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditreacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
