import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectsharesComponent } from './proyectshares.component';

describe('ProyectsharesComponent', () => {
  let component: ProyectsharesComponent;
  let fixture: ComponentFixture<ProyectsharesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectsharesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectsharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
