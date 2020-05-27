import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreacionComponent } from './addreacion.component';

describe('AddreacionComponent', () => {
  let component: AddreacionComponent;
  let fixture: ComponentFixture<AddreacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
