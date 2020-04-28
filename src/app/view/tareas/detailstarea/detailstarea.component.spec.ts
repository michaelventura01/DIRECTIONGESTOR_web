import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstareaComponent } from './detailstarea.component';

describe('DetailstareaComponent', () => {
  let component: DetailstareaComponent;
  let fixture: ComponentFixture<DetailstareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailstareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailstareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
