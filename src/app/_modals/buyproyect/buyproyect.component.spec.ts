import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyproyectComponent } from './buyproyect.component';

describe('BuyproyectComponent', () => {
  let component: BuyproyectComponent;
  let fixture: ComponentFixture<BuyproyectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyproyectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyproyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
