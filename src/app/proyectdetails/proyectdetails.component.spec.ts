import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectdetailsComponent } from './proyectdetails.component';

describe('ProyectdetailsComponent', () => {
  let component: ProyectdetailsComponent;
  let fixture: ComponentFixture<ProyectdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
