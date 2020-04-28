import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsaulaComponent } from './detailsaula.component';

describe('DetailsaulaComponent', () => {
  let component: DetailsaulaComponent;
  let fixture: ComponentFixture<DetailsaulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsaulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsaulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
