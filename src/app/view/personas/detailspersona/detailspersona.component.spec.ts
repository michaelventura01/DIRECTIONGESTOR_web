import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailspersonaComponent } from './detailspersona.component';

describe('DetailspersonaComponent', () => {
  let component: DetailspersonaComponent;
  let fixture: ComponentFixture<DetailspersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailspersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailspersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
