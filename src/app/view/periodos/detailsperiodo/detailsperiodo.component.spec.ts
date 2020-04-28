import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsperiodoComponent } from './detailsperiodo.component';

describe('DetailsperiodoComponent', () => {
  let component: DetailsperiodoComponent;
  let fixture: ComponentFixture<DetailsperiodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsperiodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsperiodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
