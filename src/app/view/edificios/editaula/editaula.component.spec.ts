import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaulaComponent } from './editaula.component';

describe('EditaulaComponent', () => {
  let component: EditaulaComponent;
  let fixture: ComponentFixture<EditaulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
