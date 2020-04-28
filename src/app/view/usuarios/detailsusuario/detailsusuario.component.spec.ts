import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsusuarioComponent } from './detailsusuario.component';

describe('DetailsusuarioComponent', () => {
  let component: DetailsusuarioComponent;
  let fixture: ComponentFixture<DetailsusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
