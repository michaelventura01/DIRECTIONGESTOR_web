import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedificioComponent } from './detailedificio.component';

describe('DetailedificioComponent', () => {
  let component: DetailedificioComponent;
  let fixture: ComponentFixture<DetailedificioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedificioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
