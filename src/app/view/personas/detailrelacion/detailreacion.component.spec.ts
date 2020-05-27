import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailreacionComponent } from './detailreacion.component';

describe('DetailreacionComponent', () => {
  let component: DetailreacionComponent;
  let fixture: ComponentFixture<DetailreacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailreacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
